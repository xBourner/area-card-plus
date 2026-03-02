<h1 id="top" align="center">Area Card Plus</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-card-header.png" alt="Area Card Plus Header" width="100%">
</p>

<p align="center">
  <a href="https://github.com/hacs/integration">
    <img src="https://img.shields.io/badge/hacs-default-orange.svg?style=for-the-badge" alt="HACS">
  </a>
  <a href="https://github.com/xBourner/area-card-plus/releases">
    <img src="https://img.shields.io/github/downloads/xBourner/area-card-plus/total?style=for-the-badge" alt="GitHub Downloads">
  </a>
  <a href="https://github.com/xBourner/area-card-plus/releases/">
    <img src="https://img.shields.io/github/release/xBourner/area-card-plus?style=for-the-badge" alt="GitHub release">
  </a>
  <a href="https://github.com/xBourner/area-card-plus">
    <img src="https://img.shields.io/github/stars/xBourner/area-card-plus?style=for-the-badge" alt="Stars">
  </a>
  <a href="https://github.com/xBourner/area-card-plus/issues">
    <img src="https://img.shields.io/github/issues/xBourner/area-card-plus?style=for-the-badge" alt="Issues">
  </a>
</p>

## Overview

**Area Card Plus** is a beautifully engineered custom card for your Home Assistant Dashboard that unlocks the full potential of your Areas.

I always thought the default area card had so much more potential, so I built my own. This card intelligently gathers all entities and devices linked to an Area and neatly groups them by domains or device classes right out of the box. 

*(Note: To ensure this card works perfectly, please verify that your relevant entities are correctly assigned to their respective areas and domains.)*

<p align="center">
  <img width="49%" alt="Light Mode" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-single-light.png">
&nbsp; 
  <img width="49%" alt="Dark Mode" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-single-dark.png">
</p>

<p align="center">
  <img width="49%" alt="Multi Light" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-multi-light.png">
&nbsp; 
  <img width="49%" alt="Multi Dark" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-multi-dark.png">
</p>

### Vertical Mode
<p align="center">
  <img width="49%" alt="Vertical Light" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-vertical-light.png">
&nbsp; 
  <img width="49%" alt="Vertical Dark" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-vertical-dark.png">
</p>

### V2 Theme
<p align="center">
  <img width="49%" alt="V2 Light" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-multi-light-v2.png">
&nbsp; 
  <img width="49%" alt="V2 Dark" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-multi-dark-v2.png">
</p>

**Note:** This card is highly influenced by the fantastic [Dwains Dashboard](https://github.com/dwainscheeren/dwains-lovelace-dashboard). Now you can harness that great idea as a single, versatile card in any of your Dashboards.

## ✨ Features

- 🤖 **Zero-Configuration Magic** - Automatically populates by simply selecting an Area.
- ✅ **Smart State Filtering** - Intelligently displays entities that are currently in an "on" or active state.
- 📚 **Dynamic Grouping** - Neatly organizes your active entities by their `domain` or `device_class`.
- 🎨 **Multiple Themes** - Includes two distinct core designs (V1 & V2) to match your dashboard's style.
- 📑 **Interactive Detail Popups** - Tap any group to open a beautiful, native-feeling popup rendering entities as interactive Tile Cards.
- 🔧 **Highly Customizable** - Extensive styling and configuration options directly within the UI.
- 🧠 **100% GUI Editor Ready** - A fully-featured visual editor means no YAML editing is required to set it up!
- 📱 **Fully Responsive** - Carefully optimized layouts ensure the optimal viewing experience on both desktop and mobile devices.
- 🌍 **Native Localization** - Automatically translates perfectly into all Home Assistant supported languages.

## 📥 Installation

### Method 1: HACS (Recommended)

The easiest way to install and keep **Area Card Plus** updated is via HACS.

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=xBourner&repository=area-card-plus&category=plugin)

1. Ensure [HACS](https://hacs.xyz) is installed.
2. Open HACS in Home Assistant.
3. Search for **Area Card Plus**, or add this repository (`https://github.com/xBourner/area-card-plus`) as a Custom Repository under the Dashboard category.
4. Download and Install.
5. **Clear your browser cache** and refresh (F5) the page.

*(For detailed help on custom repositories, see [HACS Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/))*

### Method 2: Manual Install

1. Download the **area-card-plus.js** file from the latest release.
2. Put the **area-card-plus.js** file into your `config/www` folder.
3. Add a reference to **area-card-plus.js** in your Dashboard. There are two ways to do that:
   - **Using UI:** Settings → Dashboards → More Options icon → Resources → Add Resource → Set Url as `/local/area-card-plus.js` → Set Resource type as JavaScript Module. *(Note: If you do not see the Resources menu, you will need to enable Advanced Mode in your User Profile)*
   - **Using YAML:** Add the following code to your lovelace section:
     ```yaml
      resources:
      - url: /local/area-card-plus.js
        type: module
     ```

## ⚙️ Configuration & Usage

Once installed, simply edit your dashboard, click **Add Card**, and search for **Area Card Plus**. The visual editor will guide you through all options!

Just choose an Area and the card will handle the rest. Remember, the card relies on your Area configuration, so be sure you have properly assigned your devices/entities to their corresponding Areas in Home Assistant.

For advanced configuration and YAML examples, please visit the [Wiki](https://github.com/xBourner/area-card-plus/wiki).

## ❤️ Support My Work

Developing and maintaining custom cards takes a lot of time and coffee. If you enjoy using Area Card Plus and want to support its ongoing development, I would greatly appreciate it!

<p align="center">
  <a href="https://discord.gg/RfVx7hmZD3">
    <img src="https://img.shields.io/discord/1341456711835455609?style=for-the-badge&logo=discord&logoColor=%237289da&label=Discord&color=%237289da" alt="Discord">
  </a>
  <a href="https://www.buymeacoffee.com/bourner">
    <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black&style=for-the-badge" alt="Buy Me A Coffee">
  </a>
  <a href="https://github.com/sponsors/xBourner">
    <img src="https://img.shields.io/badge/Sponsor%20on%20GitHub-30363d?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Sponsors">
  </a>
  <a href="https://www.paypal.me/gibgas123">
    <img src="https://img.shields.io/badge/PayPal-003087?logo=paypal&logoColor=fff&style=for-the-badge" alt="PayPal">
  </a>
</p>

Join the <a href="https://discord.gg/RfVx7hmZD3">**community Discord server**</a> to leave feedback, request features, or get help with your configuration.

---

[🔝 Back to top](#top)
