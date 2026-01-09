import type { User } from '@/domain/entities/User';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Mail, Phone, Globe, User as UserIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface UserListProps {
    users: User[];
    isLoading: boolean;
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

export function UserList({ users, isLoading, onEdit, onDelete }: UserListProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        setUserToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete !== null) {
            onDelete(userToDelete);
            setDeleteDialogOpen(false);
            setUserToDelete(null);
        }
    };

    if (isLoading) {
        return (
            <Card className="animate-fade-in">
                <CardContent className="p-12 text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
                        <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="animate-fade-in">
            <CardHeader>
                <CardTitle className="text-2xl">Users</CardTitle>
                <CardDescription>
                    Manage your users - {users.length} total
                </CardDescription>
            </CardHeader>
            <CardContent>
                {users.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <UserIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No users found</p>
                        <p className="text-sm">Create your first user to get started</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {users.map((user, index) => (
                            <div
                                key={user.id}
                                className="glass-effect rounded-lg p-4 hover:bg-white/10 transition-all duration-300 animate-fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <UserIcon className="w-5 h-5 text-primary" />
                                            <h3 className="font-semibold text-lg">{user.name}</h3>
                                        </div>

                                        <div className="space-y-1 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                <span>{user.email}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <UserIcon className="w-4 h-4" />
                                                <span>@{user.username}</span>
                                            </div>

                                            {user.phone && (
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4" />
                                                    <span>{user.phone}</span>
                                                </div>
                                            )}

                                            {user.website && (
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-4 h-4" />
                                                    <a
                                                        href={`https://${user.website}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline"
                                                    >
                                                        {user.website}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => onEdit(user)}
                                            className="hover:bg-primary/20"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => handleDeleteClick(user.id)}
                                            className="hover:bg-destructive/20"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the user.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmDelete}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
