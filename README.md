# Open Tabs Exporter

A small Chrome/Chromium extension that saves the URLs and titles of your open tabs to a plain-text file.

## Install

1. Download or clone this repository.
2. Open `chrome://extensions` in Chrome or a Chromium-based browser.
3. Turn on **Developer mode**.
4. Select **Load unpacked** and choose this project folder.

## Use

Click the **Open Tabs Exporter** toolbar button, then choose **Export tabs**. The extension downloads a file named `open-tabs-YYYY-MM-DD-HH-MM-SS.txt` using your local date and time. Each line contains one tab in this format:

```text
URL - Page title
```

## Permissions and privacy

- `tabs` is used to read the URLs and titles of open tabs.
- `downloads` is used to save the text file.

The extension does not send tab data to a server; it creates the export in the browser and downloads it to your device.

## Development

There is no build step or dependency installation. After changing the extension files, reload the unpacked extension from `chrome://extensions` to try the changes.
