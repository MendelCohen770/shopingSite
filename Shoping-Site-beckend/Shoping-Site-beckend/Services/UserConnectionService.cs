using System.Collections.Concurrent;
using Shoping_Site_beckend.Models;

public interface IUserConnectionService
{
    void AddUser(string connectionId, UserInfo userInfo);
    void RemoveUser(string connectionId);
    UserInfo? GetUserByConnectionId(string connectionId);
    string GetConnectionIdByUserId(int userId);
    List<UserInfo> GetAllUsers();
    UserInfo? GetUser(string connectionId);
}

public class UserConnectionService : IUserConnectionService
{
    private readonly ConcurrentDictionary<string, UserInfo> _connectedUsers = new ConcurrentDictionary<string, UserInfo>();

    public void AddUser(string connectionId, UserInfo userInfo)
    {
        if (string.IsNullOrEmpty(connectionId))
        {
            Console.WriteLine($"Connection ID cannot be null or empty: {connectionId}");
        }
        if (userInfo == null) 
        {
            Console.WriteLine($"User information cannot be null: {userInfo}");
            return;
        }
        if (!_connectedUsers.TryAdd(connectionId, userInfo))
        {
            Console.WriteLine($"Failed to add user with Connection ID: {connectionId}. It might already exist.");
        } 
    }

    public void RemoveUser(string connectionId)
    {
        if (string.IsNullOrEmpty(connectionId))
        {
            Console.WriteLine($"Connection ID cannot be null or empty: {connectionId}");

        }
        if (!_connectedUsers.TryRemove(connectionId, out _))
        {
            Console.WriteLine($"No user found with Connection ID: {connectionId} to remove.");
        }
    }

    public UserInfo? GetUserByConnectionId(string connectionId)
    {
        if (string.IsNullOrEmpty(connectionId))
        {
            Console.WriteLine($"Connection ID cannot be null or empty: {connectionId}");
        }
        if (_connectedUsers.TryGetValue(connectionId, out var userInfo))
        {
            return userInfo;
        }
        Console.WriteLine($"No user found with Connection ID: {connectionId}.");
        return null;
    }

    public string GetConnectionIdByUserId(int userId)
    {
        if(userId <= 0)
        {
            Console.WriteLine($"User ID must be greater than zero: {userId}");
        }
        var connection = _connectedUsers.FirstOrDefault(x => x.Value.id == userId);
        if (connection.Key == null)
        {
            Console.WriteLine($"No connection ID found for User ID: {userId}.");
            return "No connection ID found";
        }
        return connection.Key;
    }

    public List<UserInfo> GetAllUsers()
    {
        if(_connectedUsers.Values.ToList().Count == 0)
        {
            Console.WriteLine("No users found.");
            return new List<UserInfo>();
        }
        return _connectedUsers.Values.ToList();
    }

    public UserInfo? GetUser(string connectionId)
    {
        if (string.IsNullOrEmpty(connectionId))
        {
            Console.WriteLine($"Connection ID cannot be null or empty: {connectionId}");
        }  
        if(!_connectedUsers.TryGetValue(connectionId, out var userInfo))
        {
            Console.WriteLine($"No user found with Connection ID: {connectionId}.");
            return null;
        }
        return userInfo;
    }
}
