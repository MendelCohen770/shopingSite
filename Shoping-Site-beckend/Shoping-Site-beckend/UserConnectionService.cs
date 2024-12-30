using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Shoping_Site_beckend.Models;

public interface IUserConnectionService
{
    void AddUser(string connectionId, UserInfo userInfo);
    void RemoveUser(string connectionId);
    UserInfo GetUserByConnectionId(string connectionId);
    string GetConnectionIdByUserId(int userId);
    List<UserInfo> GetAllUsers();
    UserInfo GetUser(string connectionId);
}

public class UserConnectionService : IUserConnectionService
{
    private readonly ConcurrentDictionary<string, UserInfo> _connectedUsers = new ConcurrentDictionary<string, UserInfo>();

    public void AddUser(string connectionId, UserInfo userInfo)
    {
        _connectedUsers.TryAdd(connectionId, userInfo);
    }

    public void RemoveUser(string connectionId)
    {
        _connectedUsers.TryRemove(connectionId, out _);
    }

    public UserInfo GetUserByConnectionId(string connectionId)
    {
        _connectedUsers.TryGetValue(connectionId, out var userInfo);
        return userInfo;  // ????? ?? ?????? ?? ????, ???? ????? null
    }

    public string GetConnectionIdByUserId(int userId)
    {
        // ???? ?? ?????? ?? ?????? ??? ?-UserId
        return _connectedUsers.FirstOrDefault(x => x.Value.id == userId).Key;
    }

    public List<UserInfo> GetAllUsers()
    {
        return _connectedUsers.Values.ToList();
    }

    public UserInfo GetUser(string connectionId)
    {
        _connectedUsers.TryGetValue(connectionId, out var userInfo);
        return userInfo;
    }
}
