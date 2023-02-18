import { loadAssets } from "../GameConstants";

export const BeforeLoadConfig = {
    bg:{
        x: 1110,
        y: 1110,
        key: loadAssets.Buttons.key,
        frame: "Base",
        origin: 0.5,
        scale: 1
    },
    checkBox:{
        x: 630,
        y: 1110,
        key: loadAssets.Buttons.key,
        frames:{
            checked: "Checked",
            unchecked:"CheckBox"
        },
        origin: 0.5,
        scale: 1
    }
}
