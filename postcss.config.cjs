// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };

module.exports = ({ env }) => ({
  plugins: [require('tailwindcss')(), require('autoprefixer')()],
});
