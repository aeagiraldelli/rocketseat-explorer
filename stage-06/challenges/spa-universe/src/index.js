import { Router } from './router.js';
import { BgManager } from './bgManager.js';

const router = new Router();

router.add('/', '/pages/home.html');
router.add('/universe', '/pages/universe.html');
router.add('/explore', '/pages/explorer.html');

const bgManager = new BgManager();
bgManager.add('/', '/assets/images/mountains-universe-1.png');
bgManager.add('/universe', '/assets/images/mountains-universe-2.png');
bgManager.add('/explore', '/assets/images/mountains-universe-3.png');

router.setBgManager(bgManager);

router.handle();
window.route = () => router.route();
