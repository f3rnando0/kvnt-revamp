const domainRegex = /^(?!.*\s)(?!.*www)(?!.*http:\/\/)(?!.*https:\/\/).+$/
const usernameRegex = /^[A-Za-z0-9_]{1,32}$/
const passwordRegex = /^\S+$/

export default {
    async execute(ctx, user) {
        const args = user.lastState.split('_');

        if(args[1] === 'domain') {

        }
    }
}