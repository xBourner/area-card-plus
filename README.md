<a name="top"></a>

# Area Card Plus

[![GitHub release](https://img.shields.io/github/release/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card/releases/)
[![stars - status-card](https://img.shields.io/github/stars/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card)
[![GitHub issues](https://img.shields.io/github/issues/xBourner/area-card?style=for-the-badge)](https://github.com/xBourner/area-card/issues)

<img src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-card-header.png" alt="Area Card Plus Header" width="100%">

# Support my work

If you like my work it would be nice if you support it. You don't have to but this will keep me motivated and i will appreciate it much! <br>
You can also join my Discord Server to leave a feedback, get help or contribute with ideas :) 

[![Discord](https://img.shields.io/discord/1341456711835455609?style=for-the-badge&logo=discord&logoColor=%237289da&label=Discord&color=%237289da)](https://discord.gg/RfVx7hmZD3)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black&style=for-the-badge)](https://www.buymeacoffee.com/bourner)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20on%20GitHub-30363d?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sponsors/xBourner)
[![PayPal](https://img.shields.io/badge/PayPal-003087?logo=paypal&logoColor=fff&style=for-the-badge)](https://www.paypal.me/gibgas123)

# Overview

An **Area Card** for your Home Assistant Dashboard

I always thought the area card has so much more potential so i made my own one. <br>
The card will show all entities/devices grouped into domains or device classes that are linked to your area. <br>
To make sure this card will work like it should please check if your relevant entities are assigned to the correct domain.

This card i highly influenced by [Dwains Dashboard](https://github.com/dwainscheeren/dwains-lovelace-dashboard). So now you can use this great idea as a single card in all of your Dashboards

<p align="center">
  <img alt="Light" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-single-light.png" width="49%">
&nbsp; 
  <img alt="Dark" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-single-dark.png" width="49%">
</p>

<p align="center">
  <img alt="Light" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-multi-light.png" width="49%">
&nbsp; 
  <img alt="Dark" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-multi-dark.png" width="49%">
</p>

<p align="center">
  <img alt="Light" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-vertical-light.png" width="49%">
&nbsp; 
  <img alt="Dark" src="https://raw.githubusercontent.com/xbourner/area-card-plus/main/.github/img/area-vertical-dark.png" width="49%">
</p>


### How it works
 - 🤖 **Auto generating card** - Works when entities/devices are assigned to areas
 - ✅ **Based on entity states** - Shows entities that are in a on/active state
 - 📚 **Automatic Grouping** - Entities grouped by domain/device_class
 - 📑 **Popup View** - Entities will render as Tile Cards in a new view
 - 🧠 **GUI Editor** - No code or scripts needed
 - 🔧 **Highly customizable** - almost everything customizable
 - 📱 **Optimized for desktop and phones**
 - 🌍 **Available in all HA languages**

<br>

<p align="right">
  <a href="#top">
    <img src="https://github.com/xBourner/status-card/blob/main/.github/img/top.png" alt="Back to Top" width="4%">
  </a>
</p>

## Popup View

The popup view will show all entities/devices that are assigned to the area.
All cards will be shown as a default tile card with some having tile card features enabled. 

![image](https://github.com/user-attachments/assets/83ff411a-932e-460a-96d7-df78a5011cf2)

## Customization
Basically everything on the card can be customized/shown/hidden via gui. <br>
Below are some screenshots that show what can be done.

<details>
<summary>Click to see full options to customize</summary>
  <br>
  
#### Change icon/image, area icon, area icon color, area name, area name color, mirror card layout

![image](https://github.com/user-attachments/assets/ac1c4f24-cfca-40c0-9e62-8b05399516e9)


#### Choose domain/device to show
Here you can choose which domain/device class will be shown in the card. <br>
Only domains that are assigned to your area can be choosen. <br>
Drag & Drop is supported and will change the order in the card.

![image](https://github.com/user-attachments/assets/4719032f-ed51-4436-a109-69b99674872c)

#### Change color of domains/device classes
Here you can change the color for all domains/device classes at once. <br>
Inactive/off domains will still be shown as gray.

![image](https://github.com/user-attachments/assets/fe02e382-6b65-4a7c-9b9e-00ecd5e29f43)

#### Show only active domains for toggle_domains

![image](https://github.com/user-attachments/assets/09a22006-566e-4f33-bb24-0a35e40ed9f2)

### Customize Features
These will allow you to edit and customize each domain/device class the way you want.
  
![image](https://github.com/user-attachments/assets/f9f28ada-7361-472b-93ff-08e5504df409)

#### Change tap_action, double_tap action, hold_action icon or color
You can choose between the default HA actions [more-info, toggle, navigate, URL, perform-action, nothing] <br>
Toggle will toggle all entities of the clicked domain assigned to your area, more-info will show all entities of the clicked domain. <br>
Evenrything else has default behavior. <br>
You can select an individual icon & color for each domain if you want

![image](https://github.com/user-attachments/assets/645b325d-7b93-448b-b0ca-6e340998feea)


### Change card in the popup view
This feature is experimental and YAML only (for now)

Add this code

```yaml
customization_popup:  
  - type: light                           # change it to the domain you want
    card: |-
      type: custom:mushroom-light-card    # change card type to the card you want
      show_brightness_control: true       # use optional card features (not everything tested)
      show_color_control: true
      show_color_temp_control: true
      use_light_color: true
```
### Changing CSS for some items
You can change most things like icon, name of area and alert/toggle domains (border, color, size etc.)

![image](https://github.com/user-attachments/assets/aced58a6-f4c8-481e-93f1-c227e05de080)


</details>


## Installation

### HACS

Add this repository via HACS Custom repositories ([How to add Custom Repositories](https://hacs.xyz/docs/faq/custom_repositories/))

https://github.com/xBourner/area-card-plus


# Settings

All settings are optional. The card should work without setting any parameters in yaml or via GUI. 

```yaml
type: custom:area-card-plus    ### type of the card
area: living-room              ### choose your area
show_camera: true              ### choose if you want to show a camera entity
camera_view: live              ### choose camera mode
theme: sand                    ### choose your theme
tap_action:                    ### choose tap_action
  action: more-info
double_tap_action:             ### choose double_tap_action
  action: more-info
hold_action:                   ### choose hold_action
  action: more-info
mirrored: true                 ### lets you mirror the card layout
alert_classes:                 ### choose the alert classes (motion & window are default)
  - motion
  - window
sensor_classes:                ### choose your sensor classes (temperature & humidity are default)
  - temperature
  - humidity
toggle_domains: []             ### choose your toggle_domains (all possible values will be shown at default)
popup_domains:                 ### choose the domains which are shown in popup view (all possible values will be shown at default)
  - person
  - update
  - calendar
columns: 4                     ### how many columns will be shown in popup view
customization_domain: []       ### choose the customization for toggle_domains
customization_alert: []        ### choose the customization for alert_domains
customization_sensor: []       ### choose the customization for sensor_domains
hide_unavailable: true         ### only shows entities that are NOT in state "unavilable"
layout: vertical               ### choose horizontal/vertical layout (vertical works best in section view smaller 3)
```

# Feedback

Thank you for using my custom cards. Please leave some feedback or a star.
If you have any problems, suggestions for improvements or want to connect with me you can joing my discord: https://discord.gg/RfVx7hmZD3





