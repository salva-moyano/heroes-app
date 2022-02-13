import {mount } from 'enzyme';

import {SearchScreen} from "../../../components/search/SearchScreen";
import {MemoryRouter} from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => (
    {
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate
    }));

describe('Testing <SearchScreen', () => {

    test('should show successfully with default values', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen/>
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un héroe');

    });

    test('should show a Batman hero and input with value Batman', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen/>
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('input').prop('value')).toBe('batman')
        expect(wrapper.find('h5').text().trim()).toBe('Batman')
    });

    test('should show a error if not found hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=qwererere']}>
                <SearchScreen/>
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay resultados qwererere');
    });

    test('should call the navigate new screen', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen/>
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {target: {name: 'searchText', value: 'batman'}});
        wrapper.find('form').prop('onSubmit')({ preventDefault() {} })
        expect(mockNavigate).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('?q=batman')
    });

});