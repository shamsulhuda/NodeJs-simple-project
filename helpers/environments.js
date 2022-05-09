/** *
 * Title: Environment
 * Description: All Environment things here
 */

// Dependencies

// scaffolding
const environments = {};

environments.staging = {
    port: 5000,
    envName: 'staging',
};
environments.production = {
    port: 4000,
    envName: 'production',
};

// determine which environment was passed
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corrosponding environment object
const environmentToExport =
    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

module.exports = environmentToExport;
