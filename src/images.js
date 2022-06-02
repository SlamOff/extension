import atlassian from './assets/images/icon-atlassian.png';
import khoros from './assets/images/icon-khoros.png';
import reset from './assets/images/icon-reset.png';

export default {
  khoros: window.chrome.runtime.getURL(khoros),
  atlassian: window.chrome.runtime.getURL(atlassian),
  reset: window.chrome.runtime.getURL(reset)
};