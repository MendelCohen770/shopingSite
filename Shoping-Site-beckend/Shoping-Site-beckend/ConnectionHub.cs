using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Shoping_Site_beckend.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Shoping_Site_beckend.Hubs
{
    public class ConnectionHub : Hub
    {
        private readonly IUserConnectionService _userConnectionService;
        private readonly AppDbContext _context;

        public ConnectionHub(IUserConnectionService userConnectionService, AppDbContext context)
        {
            _userConnectionService = userConnectionService;
            _context = context;
        }

        public override async Task OnConnectedAsync()
        {
            var userName = Context.User?.Identity?.Name;

            if (!string.IsNullOrEmpty(userName))
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.username == userName);

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

                    var adminUsers = await _context.Users.Where(u => u.Role == "admin").ToListAsync();
                    foreach (var admin in adminUsers)
                    {
                        var connectionId = _userConnectionService.GetConnectionIdByUserId(admin.id);
                        if (connectionId != null)
                        {
                            await Clients.Client(connectionId).SendAsync("ReceiveAdminNotification", $"{user.username} has connected.");
                        }
                    }

                    // עדכון לכל המשתמשים לגבי מצב החיבור החדש
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
                var user = await _context.Users.FirstOrDefaultAsync(u => u.username == userName);

                if (user != null)
                {
                    var userInfo = _userConnectionService.GetUserByConnectionId(Context.ConnectionId);
                    if (userInfo != null)
                    {
                        _userConnectionService.RemoveUser(Context.ConnectionId);

                        var adminUsers = await _context.Users.Where(u => u.Role == "admin").ToListAsync();
                        foreach (var admin in adminUsers)
                        {
                            var connectionId = _userConnectionService.GetConnectionIdByUserId(admin.id);
                            if (connectionId != null)
                            {
                                await Clients.Client(connectionId).SendAsync("ReceiveAdminNotification", $"{user.username} has disconnected.");
                            }
                        }

                        // עדכון לכל המשתמשים לגבי ההתנתקות
                        await Clients.All.SendAsync("ReceiveUserStatus", _userConnectionService.GetAllUsers());
                    }
                }
            }

            await base.OnDisconnectedAsync(exception);
        }
    }

}
