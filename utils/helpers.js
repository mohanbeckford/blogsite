module.exports = {
  format_time: (date) => {
      if (!(date instanceof Date)) {
          return ""; 
      }

      return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
      });
  },
  format_summary: (content) => {
      if (content.length > 300) {
          return content.substring(0, 300) + "...";
      } else {
          return content;
      }
  },
};
