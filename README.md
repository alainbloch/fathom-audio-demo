## Start

### Install
```
> npm install
```

### Start
```
> npm run dev
```

### Set local visualizer

1. Clone wave visualizer library from repo to demo parent directory
```
> cd ../
> git clone git@github.com:alainbloch/Wave.js.git
```

2. Change package.json dependency from github to local

```
    "wave-visualizer": "file:../Wave.js"

```

3. Rerun npm install in demo

```
> cd ../fathom-wave-demo
> npm install
```

#### Next Steps
From here changes can be made to the dist file of the visualizer. Unfortunately until there is a build monitor on the library, any changes to src will require the package to be rebuilt:
```
> npm run-script build
```
And then the demo app will need to `npm install` again.