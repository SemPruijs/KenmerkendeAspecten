# Kenmerkende aspecten
Kenmerkende aspecten (short for ka) are history breakthroughs that all dutch highschool history students need to learn.

This website aims to making that learning process less painfull, while being accessible for the blind.

### usage

1. go to [ka.pruijs.net](https://ka.pruijs.net)
2. Read the instructions on the website.


## Contributing 

Do you have ideas or seen a bug? You can [create an issue](https://github.com/sempruijs/ka/issues). 
Check if your idea or bug report is not a duplicate.

## Set up developer environment.

ka works with [nix](https://nixos.org). 

1. run nix develop.

``` bash
nix develop
```

This will install typescript version that is used with this project and typescript-lsp.

2. go to ./site/ts and run:

``` bash
tsc
```

This will compile typescript to javascript on save.

3. Run local server to test it.

I use [live server vsc plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). But you can use whatever you like :)

### open a pr

Before opening a pr, make sure you [sign your commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits). And run the folling command in the root of the repo:

``` bash
nix build
```

This is same build process that runs at github. If there are now errors locally, it will probably succeed at github.

Thank you for contributing :D



 
