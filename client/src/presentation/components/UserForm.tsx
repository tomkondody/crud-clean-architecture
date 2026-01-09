import { useState, useEffect } from 'react';
import type { User, CreateUserDTO, UpdateUserDTO } from '@/domain/entities/User';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface UserFormProps {
    user: User | null;
    onSubmit: (userData: CreateUserDTO | UpdateUserDTO) => Promise<void>;
    onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        phone: '',
        website: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                username: user.username,
                phone: user.phone || '',
                website: user.website || '',
            });
        } else {
            setFormData({
                name: '',
                email: '',
                username: '',
                phone: '',
                website: '',
            });
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (user) {
                await onSubmit({ ...formData, id: user.id } as UpdateUserDTO);
            } else {
                await onSubmit(formData as CreateUserDTO);
            }

            // Reset form only if creating new user
            if (!user) {
                setFormData({
                    name: '',
                    email: '',
                    username: '',
                    phone: '',
                    website: '',
                });
            }
        } catch (error) {
            // Error is handled by parent component
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Card className="sticky top-4 animate-fade-in">
            <CardHeader>
                <CardTitle className="text-2xl">
                    {user ? 'Edit User' : 'Create New User'}
                </CardTitle>
                <CardDescription>
                    {user ? 'Update user information' : 'Add a new user to the system'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="username">Username *</Label>
                        <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="johndoe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 234 567 8900"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                            id="website"
                            name="website"
                            type="url"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : user ? 'Update User' : 'Create User'}
                        </Button>
                        {user && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
