const express = require("express");
const path = require("path");

const app = express();
const PORT = 8081;

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

  const hasExtension = path.extname(req.path);
  
  if (req.path !== "/" && !hasExtension && !req.path.endsWith('course/')) {
    if (req.path.endsWith("/")) {
      return res.redirect(req.path.slice(0, -1) + ".html/");
    }

    return res.redirect(req.path + ".html");
  }

  next();
});

app.use(express.static(path.join(__dirname, ".vitepress/dist")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
