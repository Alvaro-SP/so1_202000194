import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Targets.css';
import Tablas from './Tablas';
import Navbar from './Navbar';
import Ram from "./Ram";
import Cpu from "./Cpu";
import Footer from './Footer';
const Base = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [data, setData] = useState([]);
    const [treeData, setTreeData] = useState([]);
    // Datos de ejemplo
    const datos = {
        "0_systemd": {
            "estado": "1",
            "nombre": "systemd",
            "pid": 1,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "systemd-journal",
                    "pid": 346,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "systemd-udevd",
                    "pid": 378,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "haveged",
                    "pid": 382,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "systemd-timesyn",
                    "pid": 383,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "accounts-daemon",
                    "pid": 645,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "cron",
                    "pid": 646,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "dbus-daemon",
                    "pid": 647,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "polkitd",
                    "pid": 650,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "smartd",
                    "pid": 651,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "systemd-logind",
                    "pid": 652,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "NetworkManager",
                    "pid": 716,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "ModemManager",
                    "pid": 726,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "containerd",
                    "pid": 750,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gdm3",
                    "pid": 794,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "rtkit-daemon",
                    "pid": 894,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "udisksd",
                    "pid": 992,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "upowerd",
                    "pid": 1053,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "dockerd",
                    "pid": 1081,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "power-profiles-",
                    "pid": 1694,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "wpa_supplicant",
                    "pid": 1749,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "colord",
                    "pid": 1758,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "systemd",
                    "pid": 3009,
                    "ram": 2993,
                    "usuario": "uid_str"
                }
            ],
            "ram": 2993,
            "usuario": "x"
        },
        "100_colord": {
            "estado": "1",
            "nombre": "colord",
            "pid": 1758,
            "procesoshijos": [],
            "ram": 3202,
            "usuario": "x"
        },
        "101_gdm-session-wor": {
            "estado": "1",
            "nombre": "gdm-session-wor",
            "pid": 2995,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "gdm-x-session",
                    "pid": 3111,
                    "ram": 2676,
                    "usuario": "uid_str"
                }
            ],
            "ram": 2676,
            "usuario": "x"
        },
        "102_systemd": {
            "estado": "1",
            "nombre": "systemd",
            "pid": 3009,
            "procesoshijos": [
                {
                    "estado": "8193",
                    "nombre": "(sd-pam)",
                    "pid": 3011,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "pipewire",
                    "pid": 3038,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "wireplumber",
                    "pid": 3042,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "pipewire-pulse",
                    "pid": 3043,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gnome-keyring-d",
                    "pid": 3046,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "dbus-daemon",
                    "pid": 3047,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gvfsd",
                    "pid": 3056,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "gvfsd-fuse",
                    "pid": 3061,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "tracker-miner-f",
                    "pid": 3104,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gvfs-udisks2-vo",
                    "pid": 3124,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gvfs-goa-volume",
                    "pid": 3129,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "goa-daemon",
                    "pid": 3133,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "goa-identity-se",
                    "pid": 3140,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gvfs-afc-volume",
                    "pid": 3146,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gvfs-mtp-volume",
                    "pid": 3151,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gvfs-gphoto2-vo",
                    "pid": 3155,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "xdg-permission-",
                    "pid": 3166,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "at-spi-bus-laun",
                    "pid": 3260,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gcr-ssh-agent",
                    "pid": 3276,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gnome-session-c",
                    "pid": 3277,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gnome-session-b",
                    "pid": 3286,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "dconf-service",
                    "pid": 3309,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gnome-shell",
                    "pid": 3320,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "evolution-sourc",
                    "pid": 3361,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "evolution-calen",
                    "pid": 3394,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gnome-shell-cal",
                    "pid": 3354,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "evolution-addre",
                    "pid": 3403,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "Thunar",
                    "pid": 3406,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "at-spi2-registr",
                    "pid": 3428,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gjs",
                    "pid": 3436,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "sh",
                    "pid": 3453,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-a11y-settin",
                    "pid": 3456,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-color",
                    "pid": 3457,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-datetime",
                    "pid": 3458,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-housekeepin",
                    "pid": 3460,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-keyboard",
                    "pid": 3462,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-media-keys",
                    "pid": 3465,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-power",
                    "pid": 3466,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-print-notif",
                    "pid": 3478,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-rfkill",
                    "pid": 3479,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-screensaver",
                    "pid": 3481,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-sharing",
                    "pid": 3483,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-smartcard",
                    "pid": 3484,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-sound",
                    "pid": 3486,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-usb-protect",
                    "pid": 3487,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-wacom",
                    "pid": 3491,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-xsettings",
                    "pid": 3496,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-printer",
                    "pid": 3566,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "ibus-x11",
                    "pid": 3625,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "ibus-portal",
                    "pid": 3635,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gjs",
                    "pid": 3575,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "obexd",
                    "pid": 3806,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gvfsd-metadata",
                    "pid": 3914,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "xdg-desktop-por",
                    "pid": 3947,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "xdg-document-po",
                    "pid": 3958,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "xdg-desktop-por",
                    "pid": 3981,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "chrome_crashpad",
                    "pid": 8058,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "cpptools-srv",
                    "pid": 9714,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "nautilus",
                    "pid": 9949,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gnome-terminal-",
                    "pid": 12053,
                    "ram": 2846,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "cpptools-srv",
                    "pid": 14224,
                    "ram": 2846,
                    "usuario": "uid_str"
                }
            ],
            "ram": 2846,
            "usuario": "x"
        },
        "103_(sd-pam)": {
            "estado": "8193",
            "nombre": "(sd-pam)",
            "pid": 3011,
            "procesoshijos": [],
            "ram": 942,
            "usuario": "x"
        },
        "104_pipewire": {
            "estado": "1",
            "nombre": "pipewire",
            "pid": 3038,
            "procesoshijos": [],
            "ram": 3430,
            "usuario": "x"
        },
        "105_wireplumber": {
            "estado": "1",
            "nombre": "wireplumber",
            "pid": 3042,
            "procesoshijos": [],
            "ram": 4347,
            "usuario": "x"
        },
        "106_pipewire-pulse": {
            "estado": "1",
            "nombre": "pipewire-pulse",
            "pid": 3043,
            "procesoshijos": [],
            "ram": 11244,
            "usuario": "x"
        },
        "107_gnome-keyring-d": {
            "estado": "1",
            "nombre": "gnome-keyring-d",
            "pid": 3046,
            "procesoshijos": [],
            "ram": 2607,
            "usuario": "x"
        },
        "108_dbus-daemon": {
            "estado": "1",
            "nombre": "dbus-daemon",
            "pid": 3047,
            "procesoshijos": [],
            "ram": 1450,
            "usuario": "x"
        },
        "109_gvfsd": {
            "estado": "1",
            "nombre": "gvfsd",
            "pid": 3056,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "gvfsd-trash",
                    "pid": 3892,
                    "ram": 2293,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gvfsd-recent",
                    "pid": 9614,
                    "ram": 2293,
                    "usuario": "uid_str"
                }
            ],
            "ram": 2293,
            "usuario": "x"
        },
        "10_rcu_tasks_trace": {
            "estado": "1026",
            "nombre": "rcu_tasks_trace",
            "pid": 13,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "110_gvfsd-fuse": {
            "estado": "8193",
            "nombre": "gvfsd-fuse",
            "pid": 3061,
            "procesoshijos": [],
            "ram": 2287,
            "usuario": "x"
        },
        "111_tracker-miner-f": {
            "estado": "1",
            "nombre": "tracker-miner-f",
            "pid": 3104,
            "procesoshijos": [],
            "ram": 13548,
            "usuario": "x"
        },
        "112_gdm-x-session": {
            "estado": "1",
            "nombre": "gdm-x-session",
            "pid": 3111,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "Xorg",
                    "pid": 3115,
                    "ram": 2069,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gnome-session-b",
                    "pid": 3174,
                    "ram": 2069,
                    "usuario": "uid_str"
                }
            ],
            "ram": 2069,
            "usuario": "x"
        },
        "113_Xorg": {
            "estado": "1",
            "nombre": "Xorg",
            "pid": 3115,
            "procesoshijos": [],
            "ram": 28225,
            "usuario": "x"
        },
        "114_gvfs-udisks2-vo": {
            "estado": "1",
            "nombre": "gvfs-udisks2-vo",
            "pid": 3124,
            "procesoshijos": [],
            "ram": 3498,
            "usuario": "x"
        },
        "115_gvfs-goa-volume": {
            "estado": "1",
            "nombre": "gvfs-goa-volume",
            "pid": 3129,
            "procesoshijos": [],
            "ram": 2422,
            "usuario": "x"
        },
        "116_goa-daemon": {
            "estado": "1",
            "nombre": "goa-daemon",
            "pid": 3133,
            "procesoshijos": [],
            "ram": 4995,
            "usuario": "x"
        },
        "117_goa-identity-se": {
            "estado": "1",
            "nombre": "goa-identity-se",
            "pid": 3140,
            "procesoshijos": [],
            "ram": 2850,
            "usuario": "x"
        },
        "118_gvfs-afc-volume": {
            "estado": "1",
            "nombre": "gvfs-afc-volume",
            "pid": 3146,
            "procesoshijos": [],
            "ram": 2800,
            "usuario": "x"
        },
        "119_gvfs-mtp-volume": {
            "estado": "1",
            "nombre": "gvfs-mtp-volume",
            "pid": 3151,
            "procesoshijos": [],
            "ram": 1923,
            "usuario": "x"
        },
        "11_ksoftirqd/0": {
            "estado": "1",
            "nombre": "ksoftirqd/0",
            "pid": 14,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "120_gvfs-gphoto2-vo": {
            "estado": "1",
            "nombre": "gvfs-gphoto2-vo",
            "pid": 3155,
            "procesoshijos": [],
            "ram": 1907,
            "usuario": "x"
        },
        "121_xdg-permission-": {
            "estado": "1",
            "nombre": "xdg-permission-",
            "pid": 3166,
            "procesoshijos": [],
            "ram": 2056,
            "usuario": "x"
        },
        "122_gnome-session-b": {
            "estado": "1",
            "nombre": "gnome-session-b",
            "pid": 3174,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "ssh-agent",
                    "pid": 3236,
                    "ram": 3232,
                    "usuario": "uid_str"
                }
            ],
            "ram": 3232,
            "usuario": "x"
        },
        "123_ssh-agent": {
            "estado": "1",
            "nombre": "ssh-agent",
            "pid": 3236,
            "procesoshijos": [],
            "ram": 209,
            "usuario": "x"
        },
        "124_at-spi-bus-laun": {
            "estado": "1",
            "nombre": "at-spi-bus-laun",
            "pid": 3260,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "dbus-daemon",
                    "pid": 3266,
                    "ram": 2271,
                    "usuario": "uid_str"
                }
            ],
            "ram": 2271,
            "usuario": "x"
        },
        "125_dbus-daemon": {
            "estado": "1",
            "nombre": "dbus-daemon",
            "pid": 3266,
            "procesoshijos": [],
            "ram": 1074,
            "usuario": "x"
        },
        "126_gcr-ssh-agent": {
            "estado": "1",
            "nombre": "gcr-ssh-agent",
            "pid": 3276,
            "procesoshijos": [],
            "ram": 1194,
            "usuario": "x"
        },
        "127_gnome-session-c": {
            "estado": "1",
            "nombre": "gnome-session-c",
            "pid": 3277,
            "procesoshijos": [],
            "ram": 1691,
            "usuario": "x"
        },
        "128_gnome-session-b": {
            "estado": "1",
            "nombre": "gnome-session-b",
            "pid": 3286,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "evolution-alarm",
                    "pid": 3470,
                    "ram": 4203,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "gsd-disk-utilit",
                    "pid": 3482,
                    "ram": 4203,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "kdeconnectd",
                    "pid": 3499,
                    "ram": 4203,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "blueman-applet",
                    "pid": 3531,
                    "ram": 4203,
                    "usuario": "uid_str"
                }
            ],
            "ram": 4203,
            "usuario": "x"
        },
        "129_dconf-service": {
            "estado": "1",
            "nombre": "dconf-service",
            "pid": 3309,
            "procesoshijos": [],
            "ram": 1891,
            "usuario": "x"
        },
        "12_rcu_preempt": {
            "estado": "1026",
            "nombre": "rcu_preempt",
            "pid": 15,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "130_gnome-shell": {
            "estado": "1",
            "nombre": "gnome-shell",
            "pid": 3320,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "gjs",
                    "pid": 4196,
                    "ram": 77601,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "firefox-esr",
                    "pid": 4283,
                    "ram": 77601,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 8036,
                    "ram": 77601,
                    "usuario": "uid_str"
                }
            ],
            "ram": 77601,
            "usuario": "x"
        },
        "131_gnome-shell-cal": {
            "estado": "1",
            "nombre": "gnome-shell-cal",
            "pid": 3354,
            "procesoshijos": [],
            "ram": 3386,
            "usuario": "x"
        },
        "132_evolution-sourc": {
            "estado": "1",
            "nombre": "evolution-sourc",
            "pid": 3361,
            "procesoshijos": [],
            "ram": 5666,
            "usuario": "x"
        },
        "133_evolution-calen": {
            "estado": "1",
            "nombre": "evolution-calen",
            "pid": 3394,
            "procesoshijos": [],
            "ram": 4860,
            "usuario": "x"
        },
        "134_evolution-addre": {
            "estado": "1",
            "nombre": "evolution-addre",
            "pid": 3403,
            "procesoshijos": [],
            "ram": 5436,
            "usuario": "x"
        },
        "135_Thunar": {
            "estado": "1",
            "nombre": "Thunar",
            "pid": 3406,
            "procesoshijos": [],
            "ram": 10848,
            "usuario": "x"
        },
        "136_at-spi2-registr": {
            "estado": "1",
            "nombre": "at-spi2-registr",
            "pid": 3428,
            "procesoshijos": [],
            "ram": 2237,
            "usuario": "x"
        },
        "137_gjs": {
            "estado": "1",
            "nombre": "gjs",
            "pid": 3436,
            "procesoshijos": [],
            "ram": 6221,
            "usuario": "x"
        },
        "138_sh": {
            "estado": "1",
            "nombre": "sh",
            "pid": 3453,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "ibus-daemon",
                    "pid": 3490,
                    "ram": 219,
                    "usuario": "uid_str"
                }
            ],
            "ram": 219,
            "usuario": "x"
        },
        "139_gsd-a11y-settin": {
            "estado": "1",
            "nombre": "gsd-a11y-settin",
            "pid": 3456,
            "procesoshijos": [],
            "ram": 2463,
            "usuario": "x"
        },
        "13_migration/0": {
            "estado": "1",
            "nombre": "migration/0",
            "pid": 16,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "140_gsd-color": {
            "estado": "1",
            "nombre": "gsd-color",
            "pid": 3457,
            "procesoshijos": [],
            "ram": 4630,
            "usuario": "x"
        },
        "141_gsd-datetime": {
            "estado": "1",
            "nombre": "gsd-datetime",
            "pid": 3458,
            "procesoshijos": [],
            "ram": 2712,
            "usuario": "x"
        },
        "142_gsd-housekeepin": {
            "estado": "1",
            "nombre": "gsd-housekeepin",
            "pid": 3460,
            "procesoshijos": [],
            "ram": 2127,
            "usuario": "x"
        },
        "143_gsd-keyboard": {
            "estado": "1",
            "nombre": "gsd-keyboard",
            "pid": 3462,
            "procesoshijos": [],
            "ram": 4486,
            "usuario": "x"
        },
        "144_gsd-media-keys": {
            "estado": "1",
            "nombre": "gsd-media-keys",
            "pid": 3465,
            "procesoshijos": [],
            "ram": 5954,
            "usuario": "x"
        },
        "145_gsd-power": {
            "estado": "1",
            "nombre": "gsd-power",
            "pid": 3466,
            "procesoshijos": [],
            "ram": 5685,
            "usuario": "x"
        },
        "146_evolution-alarm": {
            "estado": "1",
            "nombre": "evolution-alarm",
            "pid": 3470,
            "procesoshijos": [],
            "ram": 9595,
            "usuario": "x"
        },
        "147_gsd-print-notif": {
            "estado": "1",
            "nombre": "gsd-print-notif",
            "pid": 3478,
            "procesoshijos": [],
            "ram": 2768,
            "usuario": "x"
        },
        "148_gsd-rfkill": {
            "estado": "1",
            "nombre": "gsd-rfkill",
            "pid": 3479,
            "procesoshijos": [],
            "ram": 2444,
            "usuario": "x"
        },
        "149_gsd-screensaver": {
            "estado": "1",
            "nombre": "gsd-screensaver",
            "pid": 3481,
            "procesoshijos": [],
            "ram": 1908,
            "usuario": "x"
        },
        "14_cpuhp/0": {
            "estado": "1",
            "nombre": "cpuhp/0",
            "pid": 18,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "150_gsd-disk-utilit": {
            "estado": "1",
            "nombre": "gsd-disk-utilit",
            "pid": 3482,
            "procesoshijos": [],
            "ram": 1310,
            "usuario": "x"
        },
        "151_gsd-sharing": {
            "estado": "1",
            "nombre": "gsd-sharing",
            "pid": 3483,
            "procesoshijos": [],
            "ram": 3047,
            "usuario": "x"
        },
        "152_gsd-smartcard": {
            "estado": "1",
            "nombre": "gsd-smartcard",
            "pid": 3484,
            "procesoshijos": [],
            "ram": 2892,
            "usuario": "x"
        },
        "153_gsd-sound": {
            "estado": "1",
            "nombre": "gsd-sound",
            "pid": 3486,
            "procesoshijos": [],
            "ram": 2381,
            "usuario": "x"
        },
        "154_gsd-usb-protect": {
            "estado": "1",
            "nombre": "gsd-usb-protect",
            "pid": 3487,
            "procesoshijos": [],
            "ram": 2000,
            "usuario": "x"
        },
        "155_ibus-daemon": {
            "estado": "1",
            "nombre": "ibus-daemon",
            "pid": 3490,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "ibus-dconf",
                    "pid": 3597,
                    "ram": 3441,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "ibus-extension-",
                    "pid": 3602,
                    "ram": 3441,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "ibus-engine-sim",
                    "pid": 3791,
                    "ram": 3441,
                    "usuario": "uid_str"
                }
            ],
            "ram": 3441,
            "usuario": "x"
        },
        "156_gsd-wacom": {
            "estado": "1",
            "nombre": "gsd-wacom",
            "pid": 3491,
            "procesoshijos": [],
            "ram": 4660,
            "usuario": "x"
        },
        "157_gsd-xsettings": {
            "estado": "1",
            "nombre": "gsd-xsettings",
            "pid": 3496,
            "procesoshijos": [],
            "ram": 5183,
            "usuario": "x"
        },
        "158_kdeconnectd": {
            "estado": "1",
            "nombre": "kdeconnectd",
            "pid": 3499,
            "procesoshijos": [],
            "ram": 8838,
            "usuario": "x"
        },
        "159_blueman-applet": {
            "estado": "1",
            "nombre": "blueman-applet",
            "pid": 3531,
            "procesoshijos": [],
            "ram": 9619,
            "usuario": "x"
        },
        "15_cpuhp/1": {
            "estado": "1",
            "nombre": "cpuhp/1",
            "pid": 19,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "160_gsd-printer": {
            "estado": "1",
            "nombre": "gsd-printer",
            "pid": 3566,
            "procesoshijos": [],
            "ram": 2841,
            "usuario": "x"
        },
        "161_gjs": {
            "estado": "1",
            "nombre": "gjs",
            "pid": 3575,
            "procesoshijos": [],
            "ram": 6081,
            "usuario": "x"
        },
        "162_ibus-dconf": {
            "estado": "1",
            "nombre": "ibus-dconf",
            "pid": 3597,
            "procesoshijos": [],
            "ram": 2136,
            "usuario": "x"
        },
        "163_ibus-extension-": {
            "estado": "1",
            "nombre": "ibus-extension-",
            "pid": 3602,
            "procesoshijos": [],
            "ram": 5853,
            "usuario": "x"
        },
        "164_ibus-x11": {
            "estado": "1",
            "nombre": "ibus-x11",
            "pid": 3625,
            "procesoshijos": [],
            "ram": 5081,
            "usuario": "x"
        },
        "165_ibus-portal": {
            "estado": "1",
            "nombre": "ibus-portal",
            "pid": 3635,
            "procesoshijos": [],
            "ram": 2160,
            "usuario": "x"
        },
        "166_ibus-engine-sim": {
            "estado": "1",
            "nombre": "ibus-engine-sim",
            "pid": 3791,
            "procesoshijos": [],
            "ram": 2109,
            "usuario": "x"
        },
        "167_obexd": {
            "estado": "1",
            "nombre": "obexd",
            "pid": 3806,
            "procesoshijos": [],
            "ram": 1307,
            "usuario": "x"
        },
        "168_gvfsd-trash": {
            "estado": "1",
            "nombre": "gvfsd-trash",
            "pid": 3892,
            "procesoshijos": [],
            "ram": 2843,
            "usuario": "x"
        },
        "169_gvfsd-metadata": {
            "estado": "1",
            "nombre": "gvfsd-metadata",
            "pid": 3914,
            "procesoshijos": [],
            "ram": 1989,
            "usuario": "x"
        },
        "16_migration/1": {
            "estado": "1",
            "nombre": "migration/1",
            "pid": 20,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "170_xdg-desktop-por": {
            "estado": "1",
            "nombre": "xdg-desktop-por",
            "pid": 3947,
            "procesoshijos": [],
            "ram": 3928,
            "usuario": "x"
        },
        "171_xdg-document-po": {
            "estado": "1",
            "nombre": "xdg-document-po",
            "pid": 3958,
            "procesoshijos": [],
            "ram": 2240,
            "usuario": "x"
        },
        "172_fusermount3": {
            "estado": "8193",
            "nombre": "fusermount3",
            "pid": 3975,
            "procesoshijos": [],
            "ram": 219,
            "usuario": "x"
        },
        "173_xdg-desktop-por": {
            "estado": "1",
            "nombre": "xdg-desktop-por",
            "pid": 3981,
            "procesoshijos": [],
            "ram": 4566,
            "usuario": "x"
        },
        "174_gjs": {
            "estado": "1",
            "nombre": "gjs",
            "pid": 4196,
            "procesoshijos": [],
            "ram": 13884,
            "usuario": "x"
        },
        "175_firefox-esr": {
            "estado": "1",
            "nombre": "firefox-esr",
            "pid": 4283,
            "procesoshijos": [],
            "ram": 126743,
            "usuario": "x"
        },
        "176_Socket Process": {
            "estado": "1",
            "nombre": "Socket Process",
            "pid": 4372,
            "procesoshijos": [],
            "ram": 7586,
            "usuario": "x"
        },
        "177_Privileged Cont": {
            "estado": "1",
            "nombre": "Privileged Cont",
            "pid": 4423,
            "procesoshijos": [],
            "ram": 29406,
            "usuario": "x"
        },
        "178_Isolated Web Co": {
            "estado": "1",
            "nombre": "Isolated Web Co",
            "pid": 4454,
            "procesoshijos": [],
            "ram": 92078,
            "usuario": "x"
        },
        "179_WebExtensions": {
            "estado": "1",
            "nombre": "WebExtensions",
            "pid": 4525,
            "procesoshijos": [],
            "ram": 114873,
            "usuario": "x"
        },
        "17_ksoftirqd/1": {
            "estado": "1",
            "nombre": "ksoftirqd/1",
            "pid": 21,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "180_Isolated Web Co": {
            "estado": "1",
            "nombre": "Isolated Web Co",
            "pid": 4557,
            "procesoshijos": [],
            "ram": 47446,
            "usuario": "x"
        },
        "181_RDD Process": {
            "estado": "1",
            "nombre": "RDD Process",
            "pid": 4664,
            "procesoshijos": [],
            "ram": 14146,
            "usuario": "x"
        },
        "182_Utility Process": {
            "estado": "1",
            "nombre": "Utility Process",
            "pid": 4683,
            "procesoshijos": [],
            "ram": 8989,
            "usuario": "x"
        },
        "183_Isolated Web Co": {
            "estado": "1",
            "nombre": "Isolated Web Co",
            "pid": 7185,
            "procesoshijos": [],
            "ram": 116860,
            "usuario": "x"
        },
        "184_Isolated Web Co": {
            "estado": "1",
            "nombre": "Isolated Web Co",
            "pid": 8003,
            "procesoshijos": [],
            "ram": 41504,
            "usuario": "x"
        },
        "185_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 8036,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 8041,
                    "ram": 35362,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 8042,
                    "ram": 35362,
                    "usuario": "uid_str"
                }
            ],
            "ram": 35362,
            "usuario": "x"
        },
        "186_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 8041,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 8071,
                    "ram": 9254,
                    "usuario": "uid_str"
                }
            ],
            "ram": 9254,
            "usuario": "x"
        },
        "187_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 8042,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 8044,
                    "ram": 8875,
                    "usuario": "uid_str"
                }
            ],
            "ram": 8875,
            "usuario": "x"
        },
        "188_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 8044,
            "procesoshijos": [
                {
                    "estado": "8193",
                    "nombre": "code",
                    "pid": 8107,
                    "ram": 2832,
                    "usuario": "uid_str"
                }
            ],
            "ram": 2832,
            "usuario": "x"
        },
        "189_chrome_crashpad": {
            "estado": "1",
            "nombre": "chrome_crashpad",
            "pid": 8058,
            "procesoshijos": [],
            "ram": 664,
            "usuario": "x"
        },
        "18_kworker/1:0H": {
            "estado": "1026",
            "nombre": "kworker/1:0H",
            "pid": 23,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "190_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 8071,
            "procesoshijos": [],
            "ram": 32952,
            "usuario": "x"
        },
        "191_code": {
            "estado": "8193",
            "nombre": "code",
            "pid": 8092,
            "procesoshijos": [],
            "ram": 12906,
            "usuario": "x"
        },
        "192_code": {
            "estado": "8193",
            "nombre": "code",
            "pid": 8107,
            "procesoshijos": [],
            "ram": 90397,
            "usuario": "x"
        },
        "193_kworker/u8:1": {
            "estado": "1026",
            "nombre": "kworker/u8:1",
            "pid": 8134,
            "procesoshijos": [],
            "ram": 90397,
            "usuario": "x"
        },
        "194_code": {
            "estado": "8193",
            "nombre": "code",
            "pid": 8148,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 8275,
                    "ram": 106650,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 8276,
                    "ram": 106650,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "cpptools",
                    "pid": 8384,
                    "ram": 106650,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 8438,
                    "ram": 106650,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 9482,
                    "ram": 106650,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 9692,
                    "ram": 106650,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 9693,
                    "ram": 106650,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 11665,
                    "ram": 106650,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 11666,
                    "ram": 106650,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 11708,
                    "ram": 106650,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "docker",
                    "pid": 15395,
                    "ram": 106650,
                    "usuario": "uid_str"
                }
            ],
            "ram": 106650,
            "usuario": "x"
        },
        "195_code": {
            "estado": "8193",
            "nombre": "code",
            "pid": 8167,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 8180,
                    "ram": 30983,
                    "usuario": "uid_str"
                }
            ],
            "ram": 30983,
            "usuario": "x"
        },
        "196_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 8180,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "zsh",
                    "pid": 8316,
                    "ram": 17144,
                    "usuario": "uid_str"
                }
            ],
            "ram": 17144,
            "usuario": "x"
        },
        "197_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 8217,
            "procesoshijos": [],
            "ram": 21157,
            "usuario": "x"
        },
        "198_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 8275,
            "procesoshijos": [],
            "ram": 17224,
            "usuario": "x"
        },
        "199_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 8276,
            "procesoshijos": [],
            "ram": 19652,
            "usuario": "x"
        },
        "19_cpuhp/2": {
            "estado": "1",
            "nombre": "cpuhp/2",
            "pid": 24,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "1_kthreadd": {
            "estado": "1",
            "nombre": "kthreadd",
            "pid": 2,
            "procesoshijos": [
                {
                    "estado": "1026",
                    "nombre": "rcu_gp",
                    "pid": 3,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "rcu_par_gp",
                    "pid": 4,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "slub_flushwq",
                    "pid": 5,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "netns",
                    "pid": 6,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/0:0H",
                    "pid": 8,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "mm_percpu_wq",
                    "pid": 10,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "rcu_tasks_kthre",
                    "pid": 11,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "rcu_tasks_rude_",
                    "pid": 12,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "rcu_tasks_trace",
                    "pid": 13,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "ksoftirqd/0",
                    "pid": 14,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "rcu_preempt",
                    "pid": 15,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "migration/0",
                    "pid": 16,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "cpuhp/0",
                    "pid": 18,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "cpuhp/1",
                    "pid": 19,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "migration/1",
                    "pid": 20,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "ksoftirqd/1",
                    "pid": 21,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/1:0H",
                    "pid": 23,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "cpuhp/2",
                    "pid": 24,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "migration/2",
                    "pid": 25,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "ksoftirqd/2",
                    "pid": 26,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "cpuhp/3",
                    "pid": 29,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "migration/3",
                    "pid": 30,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "ksoftirqd/3",
                    "pid": 31,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/3:0H",
                    "pid": 33,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "kdevtmpfs",
                    "pid": 38,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "inet_frag_wq",
                    "pid": 39,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "kauditd",
                    "pid": 40,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "khungtaskd",
                    "pid": 41,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "oom_reaper",
                    "pid": 42,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "writeback",
                    "pid": 43,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "kcompactd0",
                    "pid": 44,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "ksmd",
                    "pid": 45,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "8193",
                    "nombre": "khugepaged",
                    "pid": 46,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kintegrityd",
                    "pid": 47,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kblockd",
                    "pid": 48,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "blkcg_punt_bio",
                    "pid": 49,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "tpm_dev_wq",
                    "pid": 50,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "edac-poller",
                    "pid": 51,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "devfreq_wq",
                    "pid": 52,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/2:1H",
                    "pid": 56,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "kswapd0",
                    "pid": 57,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kthrotld",
                    "pid": 63,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "irq/122-aerdrv",
                    "pid": 65,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "irq/123-aerdrv",
                    "pid": 66,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "acpi_thermal_pm",
                    "pid": 67,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "xenbus_probe",
                    "pid": 68,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "mld",
                    "pid": 70,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "ipv6_addrconf",
                    "pid": 71,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kstrp",
                    "pid": 76,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "zswap-shrink",
                    "pid": 81,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "2",
                    "nombre": "kworker/u9:0",
                    "pid": 82,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/0:1H",
                    "pid": 130,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/3:1H",
                    "pid": 140,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/1:1H",
                    "pid": 141,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "cryptd",
                    "pid": 160,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "ata_sff",
                    "pid": 162,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "irq/51-DELL0792",
                    "pid": 163,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "scsi_eh_0",
                    "pid": 179,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "scsi_tmf_0",
                    "pid": 180,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "scsi_eh_1",
                    "pid": 181,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "scsi_tmf_1",
                    "pid": 182,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "irq/127-i2c_hid",
                    "pid": 221,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "card0-crtc0",
                    "pid": 248,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "card0-crtc1",
                    "pid": 249,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "card0-crtc2",
                    "pid": 250,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "jbd2/sda6-8",
                    "pid": 293,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "ext4-rsv-conver",
                    "pid": 294,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/2:2H",
                    "pid": 455,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "irq/134-mei_me",
                    "pid": 484,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "cfg80211",
                    "pid": 526,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "rpciod",
                    "pid": 539,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "xprtiod",
                    "pid": 541,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1",
                    "nombre": "watchdogd",
                    "pid": 543,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "2",
                    "nombre": "kworker/u9:1",
                    "pid": 621,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kmemstick",
                    "pid": 638,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "ath10k_wq",
                    "pid": 657,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "ath10k_aux_wq",
                    "pid": 659,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "ath10k_tx_compl",
                    "pid": 660,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/u8:1",
                    "pid": 8134,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/2:3",
                    "pid": 9680,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/0:2",
                    "pid": 11779,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/3:1",
                    "pid": 12392,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/1:1",
                    "pid": 12396,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/1:0",
                    "pid": 12696,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/u8:3",
                    "pid": 14247,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/2:1",
                    "pid": 14278,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "2",
                    "nombre": "kworker/3:0",
                    "pid": 14279,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/0:0",
                    "pid": 14923,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/u8:0",
                    "pid": 15002,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/u9:2",
                    "pid": 15017,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/u8:2",
                    "pid": 15051,
                    "ram": 2993,
                    "usuario": "uid_str"
                },
                {
                    "estado": "1026",
                    "nombre": "kworker/3:2",
                    "pid": 15733,
                    "ram": 2993,
                    "usuario": "uid_str"
                }
            ],
            "ram": 2993,
            "usuario": "x"
        },
        "200_zsh": {
            "estado": "1",
            "nombre": "zsh",
            "pid": 8316,
            "procesoshijos": [],
            "ram": 1452,
            "usuario": "x"
        },
        "201_cpptools": {
            "estado": "8193",
            "nombre": "cpptools",
            "pid": 8384,
            "procesoshijos": [],
            "ram": 8637,
            "usuario": "x"
        },
        "202_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 8438,
            "procesoshijos": [],
            "ram": 18324,
            "usuario": "x"
        },
        "203_Isolated Web Co": {
            "estado": "1",
            "nombre": "Isolated Web Co",
            "pid": 9430,
            "procesoshijos": [],
            "ram": 43810,
            "usuario": "x"
        },
        "204_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 9482,
            "procesoshijos": [],
            "ram": 27079,
            "usuario": "x"
        },
        "205_gvfsd-recent": {
            "estado": "1",
            "nombre": "gvfsd-recent",
            "pid": 9614,
            "procesoshijos": [],
            "ram": 3006,
            "usuario": "x"
        },
        "206_kworker/2:3": {
            "estado": "1026",
            "nombre": "kworker/2:3",
            "pid": 9680,
            "procesoshijos": [],
            "ram": 3006,
            "usuario": "x"
        },
        "207_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 9692,
            "procesoshijos": [],
            "ram": 17448,
            "usuario": "x"
        },
        "208_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 9693,
            "procesoshijos": [],
            "ram": 16543,
            "usuario": "x"
        },
        "209_cpptools-srv": {
            "estado": "8193",
            "nombre": "cpptools-srv",
            "pid": 9714,
            "procesoshijos": [],
            "ram": 4882,
            "usuario": "x"
        },
        "20_migration/2": {
            "estado": "1",
            "nombre": "migration/2",
            "pid": 25,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "210_nautilus": {
            "estado": "1",
            "nombre": "nautilus",
            "pid": 9949,
            "procesoshijos": [],
            "ram": 37442,
            "usuario": "x"
        },
        "211_Isolated Web Co": {
            "estado": "1",
            "nombre": "Isolated Web Co",
            "pid": 10090,
            "procesoshijos": [],
            "ram": 53232,
            "usuario": "x"
        },
        "212_Web Content": {
            "estado": "1",
            "nombre": "Web Content",
            "pid": 10850,
            "procesoshijos": [],
            "ram": 18572,
            "usuario": "x"
        },
        "213_Web Content": {
            "estado": "1",
            "nombre": "Web Content",
            "pid": 11312,
            "procesoshijos": [],
            "ram": 18056,
            "usuario": "x"
        },
        "214_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 11665,
            "procesoshijos": [],
            "ram": 31497,
            "usuario": "x"
        },
        "215_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 11666,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "code",
                    "pid": 11690,
                    "ram": 35852,
                    "usuario": "uid_str"
                }
            ],
            "ram": 35852,
            "usuario": "x"
        },
        "216_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 11690,
            "procesoshijos": [],
            "ram": 23430,
            "usuario": "x"
        },
        "217_code": {
            "estado": "1",
            "nombre": "code",
            "pid": 11708,
            "procesoshijos": [],
            "ram": 27288,
            "usuario": "x"
        },
        "218_kworker/0:2": {
            "estado": "1026",
            "nombre": "kworker/0:2",
            "pid": 11779,
            "procesoshijos": [],
            "ram": 27288,
            "usuario": "x"
        },
        "219_gnome-terminal-": {
            "estado": "1",
            "nombre": "gnome-terminal-",
            "pid": 12053,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "zsh",
                    "pid": 12078,
                    "ram": 17601,
                    "usuario": "uid_str"
                }
            ],
            "ram": 17601,
            "usuario": "x"
        },
        "21_ksoftirqd/2": {
            "estado": "1",
            "nombre": "ksoftirqd/2",
            "pid": 26,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "220_zsh": {
            "estado": "1",
            "nombre": "zsh",
            "pid": 12078,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "bash",
                    "pid": 15429,
                    "ram": 1873,
                    "usuario": "uid_str"
                }
            ],
            "ram": 1873,
            "usuario": "x"
        },
        "221_kworker/3:1": {
            "estado": "1026",
            "nombre": "kworker/3:1",
            "pid": 12392,
            "procesoshijos": [],
            "ram": 1873,
            "usuario": "x"
        },
        "222_kworker/1:1": {
            "estado": "1026",
            "nombre": "kworker/1:1",
            "pid": 12396,
            "procesoshijos": [],
            "ram": 1873,
            "usuario": "x"
        },
        "223_Web Content": {
            "estado": "1",
            "nombre": "Web Content",
            "pid": 12522,
            "procesoshijos": [],
            "ram": 18426,
            "usuario": "x"
        },
        "224_kworker/1:0": {
            "estado": "1026",
            "nombre": "kworker/1:0",
            "pid": 12696,
            "procesoshijos": [],
            "ram": 18426,
            "usuario": "x"
        },
        "225_cpptools-srv": {
            "estado": "8193",
            "nombre": "cpptools-srv",
            "pid": 14224,
            "procesoshijos": [],
            "ram": 3791,
            "usuario": "x"
        },
        "226_kworker/u8:3": {
            "estado": "1026",
            "nombre": "kworker/u8:3",
            "pid": 14247,
            "procesoshijos": [],
            "ram": 3791,
            "usuario": "x"
        },
        "227_kworker/2:1": {
            "estado": "1026",
            "nombre": "kworker/2:1",
            "pid": 14278,
            "procesoshijos": [],
            "ram": 3791,
            "usuario": "x"
        },
        "228_kworker/3:0": {
            "estado": "2",
            "nombre": "kworker/3:0",
            "pid": 14279,
            "procesoshijos": [],
            "ram": 3791,
            "usuario": "x"
        },
        "229_kworker/0:0": {
            "estado": "1026",
            "nombre": "kworker/0:0",
            "pid": 14923,
            "procesoshijos": [],
            "ram": 3791,
            "usuario": "x"
        },
        "22_cpuhp/3": {
            "estado": "1",
            "nombre": "cpuhp/3",
            "pid": 29,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "230_kworker/u8:0": {
            "estado": "1026",
            "nombre": "kworker/u8:0",
            "pid": 15002,
            "procesoshijos": [],
            "ram": 3791,
            "usuario": "x"
        },
        "231_kworker/u9:2": {
            "estado": "1026",
            "nombre": "kworker/u9:2",
            "pid": 15017,
            "procesoshijos": [],
            "ram": 3791,
            "usuario": "x"
        },
        "232_kworker/u8:2": {
            "estado": "1026",
            "nombre": "kworker/u8:2",
            "pid": 15051,
            "procesoshijos": [],
            "ram": 3791,
            "usuario": "x"
        },
        "233_docker": {
            "estado": "1",
            "nombre": "docker",
            "pid": 15395,
            "procesoshijos": [],
            "ram": 9481,
            "usuario": "x"
        },
        "234_bash": {
            "estado": "1",
            "nombre": "bash",
            "pid": 15429,
            "procesoshijos": [
                {
                    "estado": "0",
                    "nombre": "cat",
                    "pid": 15734,
                    "ram": 809,
                    "usuario": "uid_str"
                }
            ],
            "ram": 809,
            "usuario": "x"
        },
        "235_systemd-udevd": {
            "estado": "1",
            "nombre": "systemd-udevd",
            "pid": 15441,
            "procesoshijos": [],
            "ram": 1223,
            "usuario": "x"
        },
        "236_kworker/3:2": {
            "estado": "1026",
            "nombre": "kworker/3:2",
            "pid": 15733,
            "procesoshijos": [],
            "ram": 1223,
            "usuario": "x"
        },
        "237_cat": {
            "estado": "0",
            "nombre": "cat",
            "pid": 15734,
            "procesoshijos": [],
            "ram": 219,
            "usuario": "x"
        },
        "23_migration/3": {
            "estado": "1",
            "nombre": "migration/3",
            "pid": 30,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "24_ksoftirqd/3": {
            "estado": "1",
            "nombre": "ksoftirqd/3",
            "pid": 31,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "25_kworker/3:0H": {
            "estado": "1026",
            "nombre": "kworker/3:0H",
            "pid": 33,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "26_kdevtmpfs": {
            "estado": "1",
            "nombre": "kdevtmpfs",
            "pid": 38,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "27_inet_frag_wq": {
            "estado": "1026",
            "nombre": "inet_frag_wq",
            "pid": 39,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "28_kauditd": {
            "estado": "8193",
            "nombre": "kauditd",
            "pid": 40,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "29_khungtaskd": {
            "estado": "1",
            "nombre": "khungtaskd",
            "pid": 41,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "2_rcu_gp": {
            "estado": "1026",
            "nombre": "rcu_gp",
            "pid": 3,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "30_oom_reaper": {
            "estado": "8193",
            "nombre": "oom_reaper",
            "pid": 42,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "31_writeback": {
            "estado": "1026",
            "nombre": "writeback",
            "pid": 43,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "32_kcompactd0": {
            "estado": "8193",
            "nombre": "kcompactd0",
            "pid": 44,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "33_ksmd": {
            "estado": "8193",
            "nombre": "ksmd",
            "pid": 45,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "34_khugepaged": {
            "estado": "8193",
            "nombre": "khugepaged",
            "pid": 46,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "35_kintegrityd": {
            "estado": "1026",
            "nombre": "kintegrityd",
            "pid": 47,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "36_kblockd": {
            "estado": "1026",
            "nombre": "kblockd",
            "pid": 48,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "37_blkcg_punt_bio": {
            "estado": "1026",
            "nombre": "blkcg_punt_bio",
            "pid": 49,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "38_tpm_dev_wq": {
            "estado": "1026",
            "nombre": "tpm_dev_wq",
            "pid": 50,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "39_edac-poller": {
            "estado": "1026",
            "nombre": "edac-poller",
            "pid": 51,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "3_rcu_par_gp": {
            "estado": "1026",
            "nombre": "rcu_par_gp",
            "pid": 4,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "40_devfreq_wq": {
            "estado": "1026",
            "nombre": "devfreq_wq",
            "pid": 52,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "41_kworker/2:1H": {
            "estado": "1026",
            "nombre": "kworker/2:1H",
            "pid": 56,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "42_kswapd0": {
            "estado": "1",
            "nombre": "kswapd0",
            "pid": 57,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "43_kthrotld": {
            "estado": "1026",
            "nombre": "kthrotld",
            "pid": 63,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "44_irq/122-aerdrv": {
            "estado": "1",
            "nombre": "irq/122-aerdrv",
            "pid": 65,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "45_irq/123-aerdrv": {
            "estado": "1",
            "nombre": "irq/123-aerdrv",
            "pid": 66,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "46_acpi_thermal_pm": {
            "estado": "1026",
            "nombre": "acpi_thermal_pm",
            "pid": 67,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "47_xenbus_probe": {
            "estado": "1",
            "nombre": "xenbus_probe",
            "pid": 68,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "48_mld": {
            "estado": "1026",
            "nombre": "mld",
            "pid": 70,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "49_ipv6_addrconf": {
            "estado": "1026",
            "nombre": "ipv6_addrconf",
            "pid": 71,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "4_slub_flushwq": {
            "estado": "1026",
            "nombre": "slub_flushwq",
            "pid": 5,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "50_kstrp": {
            "estado": "1026",
            "nombre": "kstrp",
            "pid": 76,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "51_zswap-shrink": {
            "estado": "1026",
            "nombre": "zswap-shrink",
            "pid": 81,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "52_kworker/u9:0": {
            "estado": "2",
            "nombre": "kworker/u9:0",
            "pid": 82,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "53_kworker/0:1H": {
            "estado": "1026",
            "nombre": "kworker/0:1H",
            "pid": 130,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "54_kworker/3:1H": {
            "estado": "1026",
            "nombre": "kworker/3:1H",
            "pid": 140,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "55_kworker/1:1H": {
            "estado": "1026",
            "nombre": "kworker/1:1H",
            "pid": 141,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "56_cryptd": {
            "estado": "1026",
            "nombre": "cryptd",
            "pid": 160,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "57_ata_sff": {
            "estado": "1026",
            "nombre": "ata_sff",
            "pid": 162,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "58_irq/51-DELL0792": {
            "estado": "1",
            "nombre": "irq/51-DELL0792",
            "pid": 163,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "59_scsi_eh_0": {
            "estado": "1",
            "nombre": "scsi_eh_0",
            "pid": 179,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "5_netns": {
            "estado": "1026",
            "nombre": "netns",
            "pid": 6,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "60_scsi_tmf_0": {
            "estado": "1026",
            "nombre": "scsi_tmf_0",
            "pid": 180,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "61_scsi_eh_1": {
            "estado": "1",
            "nombre": "scsi_eh_1",
            "pid": 181,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "62_scsi_tmf_1": {
            "estado": "1026",
            "nombre": "scsi_tmf_1",
            "pid": 182,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "63_irq/127-i2c_hid": {
            "estado": "1",
            "nombre": "irq/127-i2c_hid",
            "pid": 221,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "64_card0-crtc0": {
            "estado": "1",
            "nombre": "card0-crtc0",
            "pid": 248,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "65_card0-crtc1": {
            "estado": "1",
            "nombre": "card0-crtc1",
            "pid": 249,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "66_card0-crtc2": {
            "estado": "1",
            "nombre": "card0-crtc2",
            "pid": 250,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "67_jbd2/sda6-8": {
            "estado": "1",
            "nombre": "jbd2/sda6-8",
            "pid": 293,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "68_ext4-rsv-conver": {
            "estado": "1026",
            "nombre": "ext4-rsv-conver",
            "pid": 294,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "69_systemd-journal": {
            "estado": "1",
            "nombre": "systemd-journal",
            "pid": 346,
            "procesoshijos": [],
            "ram": 4623,
            "usuario": "x"
        },
        "6_kworker/0:0H": {
            "estado": "1026",
            "nombre": "kworker/0:0H",
            "pid": 8,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "70_systemd-udevd": {
            "estado": "1",
            "nombre": "systemd-udevd",
            "pid": 378,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "systemd-udevd",
                    "pid": 15441,
                    "ram": 1865,
                    "usuario": "uid_str"
                }
            ],
            "ram": 1865,
            "usuario": "x"
        },
        "71_haveged": {
            "estado": "1",
            "nombre": "haveged",
            "pid": 382,
            "procesoshijos": [],
            "ram": 1306,
            "usuario": "x"
        },
        "72_systemd-timesyn": {
            "estado": "1",
            "nombre": "systemd-timesyn",
            "pid": 383,
            "procesoshijos": [],
            "ram": 1668,
            "usuario": "x"
        },
        "73_kworker/2:2H": {
            "estado": "1026",
            "nombre": "kworker/2:2H",
            "pid": 455,
            "procesoshijos": [],
            "ram": 1668,
            "usuario": "x"
        },
        "74_irq/134-mei_me": {
            "estado": "1",
            "nombre": "irq/134-mei_me",
            "pid": 484,
            "procesoshijos": [],
            "ram": 1668,
            "usuario": "x"
        },
        "75_cfg80211": {
            "estado": "1026",
            "nombre": "cfg80211",
            "pid": 526,
            "procesoshijos": [],
            "ram": 1668,
            "usuario": "x"
        },
        "76_rpciod": {
            "estado": "1026",
            "nombre": "rpciod",
            "pid": 539,
            "procesoshijos": [],
            "ram": 1668,
            "usuario": "x"
        },
        "77_xprtiod": {
            "estado": "1026",
            "nombre": "xprtiod",
            "pid": 541,
            "procesoshijos": [],
            "ram": 1668,
            "usuario": "x"
        },
        "78_watchdogd": {
            "estado": "1",
            "nombre": "watchdogd",
            "pid": 543,
            "procesoshijos": [],
            "ram": 1668,
            "usuario": "x"
        },
        "79_kworker/u9:1": {
            "estado": "2",
            "nombre": "kworker/u9:1",
            "pid": 621,
            "procesoshijos": [],
            "ram": 1668,
            "usuario": "x"
        },
        "7_mm_percpu_wq": {
            "estado": "1026",
            "nombre": "mm_percpu_wq",
            "pid": 10,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "80_kmemstick": {
            "estado": "1026",
            "nombre": "kmemstick",
            "pid": 638,
            "procesoshijos": [],
            "ram": 1668,
            "usuario": "x"
        },
        "81_accounts-daemon": {
            "estado": "1",
            "nombre": "accounts-daemon",
            "pid": 645,
            "procesoshijos": [],
            "ram": 2301,
            "usuario": "x"
        },
        "82_cron": {
            "estado": "8193",
            "nombre": "cron",
            "pid": 646,
            "procesoshijos": [],
            "ram": 640,
            "usuario": "x"
        },
        "83_dbus-daemon": {
            "estado": "1",
            "nombre": "dbus-daemon",
            "pid": 647,
            "procesoshijos": [],
            "ram": 1584,
            "usuario": "x"
        },
        "84_polkitd": {
            "estado": "1",
            "nombre": "polkitd",
            "pid": 650,
            "procesoshijos": [],
            "ram": 2711,
            "usuario": "x"
        },
        "85_smartd": {
            "estado": "8193",
            "nombre": "smartd",
            "pid": 651,
            "procesoshijos": [],
            "ram": 1445,
            "usuario": "x"
        },
        "86_systemd-logind": {
            "estado": "1",
            "nombre": "systemd-logind",
            "pid": 652,
            "procesoshijos": [],
            "ram": 2110,
            "usuario": "x"
        },
        "87_ath10k_wq": {
            "estado": "1026",
            "nombre": "ath10k_wq",
            "pid": 657,
            "procesoshijos": [],
            "ram": 2110,
            "usuario": "x"
        },
        "88_ath10k_aux_wq": {
            "estado": "1026",
            "nombre": "ath10k_aux_wq",
            "pid": 659,
            "procesoshijos": [],
            "ram": 2110,
            "usuario": "x"
        },
        "89_ath10k_tx_compl": {
            "estado": "1026",
            "nombre": "ath10k_tx_compl",
            "pid": 660,
            "procesoshijos": [],
            "ram": 2110,
            "usuario": "x"
        },
        "8_rcu_tasks_kthre": {
            "estado": "1026",
            "nombre": "rcu_tasks_kthre",
            "pid": 11,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "90_NetworkManager": {
            "estado": "1",
            "nombre": "NetworkManager",
            "pid": 716,
            "procesoshijos": [],
            "ram": 4675,
            "usuario": "x"
        },
        "91_ModemManager": {
            "estado": "1",
            "nombre": "ModemManager",
            "pid": 726,
            "procesoshijos": [],
            "ram": 2795,
            "usuario": "x"
        },
        "92_containerd": {
            "estado": "8193",
            "nombre": "containerd",
            "pid": 750,
            "procesoshijos": [],
            "ram": 7084,
            "usuario": "x"
        },
        "93_gdm3": {
            "estado": "1",
            "nombre": "gdm3",
            "pid": 794,
            "procesoshijos": [
                {
                    "estado": "1",
                    "nombre": "gdm-session-wor",
                    "pid": 2995,
                    "ram": 2527,
                    "usuario": "uid_str"
                }
            ],
            "ram": 2527,
            "usuario": "x"
        },
        "94_rtkit-daemon": {
            "estado": "1",
            "nombre": "rtkit-daemon",
            "pid": 894,
            "procesoshijos": [],
            "ram": 350,
            "usuario": "x"
        },
        "95_udisksd": {
            "estado": "1",
            "nombre": "udisksd",
            "pid": 992,
            "procesoshijos": [],
            "ram": 4146,
            "usuario": "x"
        },
        "96_upowerd": {
            "estado": "1",
            "nombre": "upowerd",
            "pid": 1053,
            "procesoshijos": [],
            "ram": 2074,
            "usuario": "x"
        },
        "97_dockerd": {
            "estado": "8193",
            "nombre": "dockerd",
            "pid": 1081,
            "procesoshijos": [],
            "ram": 21096,
            "usuario": "x"
        },
        "98_power-profiles-": {
            "estado": "1",
            "nombre": "power-profiles-",
            "pid": 1694,
            "procesoshijos": [],
            "ram": 2233,
            "usuario": "x"
        },
        "99_wpa_supplicant": {
            "estado": "1",
            "nombre": "wpa_supplicant",
            "pid": 1749,
            "procesoshijos": [],
            "ram": 1306,
            "usuario": "x"
        },
        "9_rcu_tasks_rude_": {
            "estado": "1026",
            "nombre": "rcu_tasks_rude_",
            "pid": 12,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        }
    };
    // const HandleEvaluate33 = () => {
    useEffect(() => {
        axios.get('http://localhost:8080/logsget')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);
    // }
    const LIMPIECITA = () => {
        setDisplayValue('0');
    };
    const handleEvaluate = () => {
        //  displayValue this is my evaluation
        try {
            if (eval(displayValue).toString() === "Infinity") {
                alert("Error: division por cero");
                // return;
            }
        } catch (e) {
            // manejar el error aquí
        }
        //  match es mi lista de valores algo asi: 
        const match = displayValue.match(/^(\-?\d+\.?\d*)\s*([+\-*/])\s*(\-?\d+\.?\d*)$/);
        if (match) {
            // setNumin1(match[1]);
            // setOperator(match[2]);
            // setNumin2(match[3]);
            // alert(match);
        } else {
            alert("Error: Ingrese una expresion valida, Gracias :D");
        }
        let operator2;
        switch (match[2]) {
            case "+":
                operator2 = "suma";
                break;
            case "-":
                operator2 = "resta";
                break;
            case "*":
                operator2 = "multi";
                break;
            case "/":
                operator2 = "divi";
                break;
            default:
                operator2 = "";
                break;
        }

        match[2] = operator2;

        axios.get(`http://localhost:8080/${match[1]}/${match[2]}/${match[3]}`)
            .then(response => {
                console.log(response.data.result.toString());
                setDisplayValue(response.data.result.toString());
                // console.log(resfin);
                axios.get('http://localhost:8080/logsget')
                    .then(res => setData(res.data))
                    .catch(err => console.error(err));
            })
            .catch(error => {
                console.error(error);
            });
    };
    return (
        <div>
            <Navbar />
            <br />
            <br />
            <br />
            <h1 className="text-center" align="center"> MONITOREO DE RECURSOS</h1>
            <div class="col-sm-6" align="center">
                    <Cpu Crr_Arr={[5, 5, 8, 9, 3, 7, 4, 10]} />
                    <br />
                    <Ram Crr_Arr={[5, 5, 8, 9, 3, 7, 8, 10, 10, 10, 10, 10, 10, 5, 5, 8, 9, 3, 7, 8, 10, 10, 10, 10, 10, 10]} />
                </div>
            <div class="container-fluid">
                
                <div class="row">
                    <div class="col-sm-12">
                        <h1 class="text-center" align="center">Resumen General de Procesos</h1>
                    </div>
                </div>
                <div className="card-container">
                    <div className="card">
                        <h2>1</h2>
                        <p>Procesos en ejecución</p>
                    </div>
                    <div className="card">
                        <h2>1</h2>
                        <p>Procesos suspendidos</p>
                    </div>
                    <div className="card">
                        <h2>2</h2>
                        <p>Procesos detenidos</p>
                    </div>
                    <div className="card">
                        <h2>2</h2>
                        <p>Procesos zombie</p>
                    </div>
                </div>
                <br />
                <div className="card-container">
                    <div className="card">
                        <h2>6</h2>
                        <p>Total de procesos</p>
                    </div>
                </div>
            </div>


            {/* <div className="calculator" align="center">
                <div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Operación</th>
                                <th>Número 1</th>
                                <th>Número 2</th>
                                <th>Resultado</th>
                                <th>Fecha y hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row.operator}</td>
                                    <td>{row.num1}</td>
                                    <td>{row.num2}</td>
                                    <td>{row.resultado}</td>
                                    <td>{row.fechayhora}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> */}
            <br />
            <br />
            <Tablas datos={datos} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>

    );
};

export default Base;