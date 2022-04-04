import { authenticationService } from '@/services';

export function authHeader() {
    const authUser = authenticationService.currentAuthenticatedUser;

    if (!authUser) {
        return {}
    }
    return { authorization: 'Bearer ' + authUser.token }
}