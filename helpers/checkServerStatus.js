const checkServerStatus = (url, interval = 25) => {
  const ms = interval * 60000;
  setTimeout(() => {
    try {
      fetch(url).then(() =>
        console.log(
          `[ ${new Date().toISOString()} ] Server status: ${url} is active`
        )
      );
    } catch (err) {
      console.log(`Error fetching status of ${url}`);
    } finally {
      checkServerStatus(url, interval);
    }
  }, ms);
};

module.exports = checkServerStatus;
