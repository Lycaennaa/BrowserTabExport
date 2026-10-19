const exportButton = document.querySelector("#export");
const status = document.querySelector("#status");

function cleanField(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ");
}

function makeFilename() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  const stamp = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join("-");
  return `open-tabs-${stamp}.txt`;
}

exportButton.addEventListener("click", async () => {
  exportButton.disabled = true;
  status.textContent = "Collecting open tabs…";

  try {
    const tabs = await chrome.tabs.query({});
    const contents = tabs
      .map((tab) => `${cleanField(tab.url ?? tab.pendingUrl)} - ${cleanField(tab.title)}`)
      .join("\n");
    const blob = new Blob([contents ? `${contents}\n` : ""], {
      type: "text/plain;charset=utf-8",
    });
    const objectUrl = URL.createObjectURL(blob);

    try {
      await chrome.downloads.download({
        url: objectUrl,
        filename: makeFilename(),
      });
      status.textContent = `Exported ${tabs.length} ${tabs.length === 1 ? "tab" : "tabs"}.`;
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    } catch (error) {
      URL.revokeObjectURL(objectUrl);
      throw error;
    }
  } catch (error) {
    status.textContent = "Export failed. Check extension permissions and try again.";
    console.error("Could not export open tabs", error);
  } finally {
    exportButton.disabled = false;
  }
});
