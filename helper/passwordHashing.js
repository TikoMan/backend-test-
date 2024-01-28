import md5 from 'md5';

const { PASSWORD_SECRET } = process.env;

const passwordHashing = (string) => md5(md5(string) + PASSWORD_SECRET);

export default passwordHashing;
