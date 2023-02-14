import { customRef } from 'vue'

export default function (key, defaultValue) {
    return customRef((track, trigger) => ({
        //get the local storage and return default value if there is not local storage saved
        get: () => {
            track()
            const value = localStorage.getItem(key)
            return value ? JSON.parse(value) : defaultValue
        },
        //update the value in the local storage
        set: value => {
            if (value === null) {
                localStorage.removeItem(key)
            } else {
                localStorage.setItem(key, JSON.stringify(value))
            }
            trigger()
        },
    }))
}