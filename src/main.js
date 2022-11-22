import {createApp} from "vue";
import {platform} from '@tauri-apps/api/os';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./style.css";
import App from "./App.vue";
import {appWindow, LogicalSize} from "@tauri-apps/api/window";



const app = createApp(App);

app.use(ElementPlus);
app.mount("#app");

const resizeWindowForMac = async () => {
    const platformName = await platform();

    if (platformName === 'darwin') {
        await appWindow.setSize(new LogicalSize(800, 660))
    }
}

resizeWindowForMac();

