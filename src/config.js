module.exports = {
PORT: process.env.PORT || 8000,
NODE_ENV: process.env.NODE_ENV || 'development',
DATABASE_URL: process.env.DATBASE_URL || 'postgresql://postgres@localhost/spiral',
TEST_DATABASE_URL: process.env.DATBASE_URL || 'postgresql://postgres@localhost/spiral_test'

}