import {AppRouter} from "../../routers/AppRouter";
import { mount } from "enzyme";
import {AuthContext} from "../../auth/authContext";


describe('Testing <AppRoutes', () => {

    test('should show login if not authenticated ', () => {
        const contextValue = { user: { logged: false } }
        const wrapper = mount(<AuthContext.Provider value={contextValue}>
            <AppRouter/>
        </AuthContext.Provider>)

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login Screen');
    });

    test('should show marvel component if authenticated  ', () => {
        const contextValue = { user: { name: 'Salva', logged: true } }
        const wrapper = mount(<AuthContext.Provider value={contextValue}>
            <AppRouter/>
        </AuthContext.Provider>)

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBeTruthy();
        expect(wrapper.find('h1').text().trim()).toBe('Marvel Comics');
    });

});