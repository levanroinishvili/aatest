export const SETTINGS = {
    debounceTime: 1000, // Time (in milliseconds) to wait for user to stop typing before emitting the search string
    hideSearchButton: true,
    buttonLabel: 'Search',
    placeholder: 'Search text',
    minLength: 2,
    maxLength: 10,
    pattern: /^[\w\s]+$/,
};

export const ERRORMESSAGES = {
    required: 'Please enter text to search',
    minLength: 'Please enter at least ' + SETTINGS.minLength + ' characters',
    maxLength: 'Please enter at most ' + SETTINGS.maxLength + ' characters',
    pattern: 'Please only enter alphanumeric characters'
};
