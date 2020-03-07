import checkPropTypes from 'check-prop-types';
import { createStoreWithMiddlewares } from '../src/store/configStore';

/**
 * Create a testing store.
 * globals: createStoreWithMiddleware, rootReducer
 * @param {object} initialState - initial state for redux store
 * @returns {store} - redux store  
 */
export const storeFactory = (initialState) => {
    return createStoreWithMiddlewares(initialState);
};

/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}

/**
* Throw error if conformingProps do not pass propTypes validation.
* @param {React.Component} component - Component to check props against.
* @param {object} conformingProps - Props we expect to conform to defined propTypes.
*/
export const checkProps = (component, conformingProps) => {
    const propError = checkPropTypes(
        component.propTypes,
        conformingProps,
        'prop',
        component.name);
    expect(propError).toBeUndefined();
}