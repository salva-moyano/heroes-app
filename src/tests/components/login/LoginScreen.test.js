import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { mount } from 'enzyme';

import { AuthContext } from '../../../auth/authContext';
import { types } from '../../../types/types';
import { LoginScreen } from '../../../components/login/LoginScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Testing <LoginScreen', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ ['/login'] }>
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('should show successfully ', () => {
        expect( wrapper ).toMatchSnapshot();
    })

    test('should make dispatch and redirect', () => {

        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: { name: 'Salva' }
        });

        expect( mockNavigate ).toHaveBeenCalledWith('/marvel', { replace: true });

        localStorage.setItem('lastPath', '/dc')

        handleClick();

        expect( mockNavigate ).toHaveBeenCalledWith('/dc', { replace: true });
    })
});