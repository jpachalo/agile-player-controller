SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "agile-player-controller/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.21"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "agile-player-controller": {
      "main": "agile-player-controller.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "agile-app": "npm:agile-app@0.1.0"
  },
  packages: {}
});
