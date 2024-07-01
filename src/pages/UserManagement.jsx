import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "", role: "", status: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleAddUser = () => {
    setUsers([...users, currentUser]);
    setCurrentUser({ name: "", email: "", role: "", status: "" });
  };

  const handleEditUser = (index) => {
    setCurrentUser(users[index]);
    setIsEditing(true);
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? currentUser : user
    );
    setUsers(updatedUsers);
    setCurrentUser({ name: "", email: "", role: "", status: "" });
    setIsEditing(false);
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={currentUser.name} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" value={currentUser.email} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" value={currentUser.role} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Input id="status" name="status" value={currentUser.status} onChange={handleInputChange} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {isEditing ? (
            <Button onClick={handleUpdateUser}>Update User</Button>
          ) : (
            <Button onClick={handleAddUser}>Add User</Button>
          )}
        </CardFooter>
      </Card>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleEditUser(index)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteUser(index)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;