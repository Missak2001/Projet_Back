const { expect } = require('chai');
const bcrypt = require('bcrypt');
const UserAccountService = require('../services/UserAccountService');

// 🧪 Simuler une DAO avec un mock
const fakeDAO = {
    getByLoginUserAccount: async (login) => {
        if (login === 'validuser') {
            return {
                id: 1,
                login: 'validuser',
                password: await bcrypt.hash('testpass', 10),
                displayName: 'Valid User',
                isEnterprise: false,
                role: 'user'
            };
        }
        return null;
    }
};

describe('🔍 Unit Test: UserAccountService.validatePassword()', () => {
    const service = new UserAccountService({});

    // On injecte manuellement le fakeDAO
    service.dao = fakeDAO;

    it('✅ retourne true si le mot de passe est correct', async () => {
        const isValid = await service.validatePassword('validuser', 'testpass');
        expect(isValid).to.be.true;
    });

    it('❌ retourne false si le mot de passe est incorrect', async () => {
        const isValid = await service.validatePassword('validuser', 'wrongpass');
        expect(isValid).to.be.false;
    });

    it('❌ retourne false si l’utilisateur n’existe pas', async () => {
        const isValid = await service.validatePassword('inexistant', 'any');
        expect(isValid).to.be.false;
    });
});
F