import { mount } from "enzyme";
import {DashboardRoutes} from "../../routers/DashboardRoutes";
import {AuthContext} from "../../auth/authContext";
import { MemoryRouter } from "react-router-dom";


describe('Testing <DashboardRoutes', () => {

    const contextValue = { user: { name: 'salva', logged: true }};

    test('should show successfully', () => {
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/']}>
                    <DashboardRoutes/>
                </MemoryRouter>
            </AuthContext.Provider>)

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('salva');
        expect(wrapper.find('h1').text().trim()).toBe('Marvel Comics');
    });

    test('should show DC Screen successfully', () => {
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/dc']}>
                    <DashboardRoutes/>
                </MemoryRouter>
            </AuthContext.Provider>)

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('salva');
        expect(wrapper.find('h1').text().trim()).toBe('DC Comics')
    });

    test('should show Search Screen successfully', () => {
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search']}>
                    <DashboardRoutes/>
                </MemoryRouter>
            </AuthContext.Provider>)

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('salva');

        expect(wrapper.find('h4').first().text().trim()).toBe('Buscar');
    });

    test('should show Hero Screen successfully', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/hero/dc-batman']}>
                    <DashboardRoutes/>
                </MemoryRouter>
            </AuthContext.Provider>)

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('salva');
        expect(wrapper.find('h3').text().trim()).toBe('Batman');
    });

});