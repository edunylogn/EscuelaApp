import { Injectable } from '@angular/core';
import { UserInterface } from '../models/userInterface';

export const roles = [
    { role: 'Administrador' },
    { role: 'Profesor', permissions: ['login', 'calendar', 'sections', 'student-sections', 'myprofile', 'edit-events'] },
    { role: 'Encargado', permissions: ['login', 'calendar', 'myprofile'] },
];

@Injectable()
export class Permissions {
    canActivate(user: UserInterface, id: string): boolean {
        if (user.userType === '1') {
            return true;
        }
        if (roles[parseInt(user.userType) - 1] && roles[parseInt(user.userType) - 1].permissions.includes(id)) {
            return true;
        }
        return false;
    }
}