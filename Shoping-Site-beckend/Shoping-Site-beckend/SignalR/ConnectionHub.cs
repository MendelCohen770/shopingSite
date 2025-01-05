using Microsoft.AspNetCore.SignalR;
using Shoping_Site_beckend.Models;
using Microsoft.EntityFrameworkCore;
using Shoping_Site_beckend.Db;
using Shoping_Site_beckend.Queries;

namespace Shoping_Site_beckend.SignalR
{
    public class ConnectionHub : Hub
    {
        private readonly IUserConnectionService _userConnectionService;
        private readonly AppDbContext _context;
        private readonly IUsersQueries _usersQueries;

        public ConnectionHub(IUserConnectionService userConnectionService, AppDbContext context, IUsersQueries usersQueries)
        {
            _userConnectionService = userConnectionService;
            _context = context;
            _usersQueries = usersQueries;
        }

        public override async Task OnConnectedAsync()
        {
            var userName = Context.User?.Identity?.Name;

            if (!string.IsNullOrEmpty(userName))
            {
                var user = await _usersQueries.GetUserByNameAsync(userName);

                if (user != null)
                {
                    var userInfo = new UserInfo
                    {
                        id = user.id,
                        username = user.username,
                        email = user.email,
                        password = "***",
                        Role = user.Role,
                        isConnected = true
                    };

                    _userConnectionService.AddUser(Context.ConnectionId, userInfo);

                    var adminUsers = await _usersQueries.GetAdminsUsersAsync();
                    foreach (var admin in adminUsers)
                    {
                        var connectionId = _userConnectionService.GetConnectionIdByUserId(admin.id);
                        if (connectionId != null)
                        {
                            await Clients.Client(connectionId).SendAsync("ReceiveAdminNotification", $"{user.username} has connected.");
                        }
                    }
                    await Clients.All.SendAsync("ReceiveUserStatus", _userConnectionService.GetAllUsers());
                }
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userName = Context.User?.Identity?.Name;

            if (!string.IsNullOrEmpty(userName))
            {
                var user = await _usersQueries.GetUserByNameAsync(userName);

                if (user != null)
                {
                    var userInfo = _userConnectionService.GetUserByConnectionId(Context.ConnectionId);
                    if (userInfo != null)
                    {
                        _userConnectionService.RemoveUser(Context.ConnectionId);

                        var adminUsers = await _usersQueries.GetAdminsUsersAsync();
                        foreach (var admin in adminUsers)
                        {
                            var connectionId = _userConnectionService.GetConnectionIdByUserId(admin.id);
                            if (connectionId != null)
                            {
                                await Clients.Client(connectionId).SendAsync("ReceiveAdminNotification", $"{user.username} has disconnected.");
                            }
                        }
                        await Clients.All.SendAsync("ReceiveUserStatus", _userConnectionService.GetAllUsers());
                    }
                }
            }

            await base.OnDisconnectedAsync(exception);
        }
    }

}
