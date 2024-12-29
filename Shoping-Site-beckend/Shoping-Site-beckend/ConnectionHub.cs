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
            var userName = Context.User?.Identity?.Name ?? "Unknown";
            var user = await _context.Users.FirstOrDefaultAsync(u => u.username == userName);

            if (user != null)
            {
                var userInfo = new UserInfo
                {
                    id = user.id,
                    username = user.username,
                    email = user.email,
                    Role = user.Role,
                    isConnected = true,
                };

                _userConnectionService.AddUser(Context.ConnectionId, userInfo);

                // עדכון המנהל ברשימת המשתמשים המחוברים
                await Clients.All.SendAsync("ReceiveUserStatus", _userConnectionService.GetAllUsers());
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _userConnectionService.RemoveUser(Context.ConnectionId);

            // עדכון המנהל ברשימת המשתמשים המחוברים
            await Clients.All.SendAsync("ReceiveUserStatus", _userConnectionService.GetAllUsers());

            await base.OnDisconnectedAsync(exception);
        }
    }

}
