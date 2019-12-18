import Cookies from 'universal-cookie';

const date = new Date();

const cookieOptions = { path: '/', sameSite: true, expires: new Date(date.setDate(date.getDate() + 30)) };

export default new Cookies();
export { cookieOptions };
