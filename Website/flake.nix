{
  description = "Built system for website";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/release-22.05";
  };

  outputs = { self, nixpkgs }: {

    packages.x86_64-linux.hello = nixpkgs.legacyPackages.x86_64-linux.hello;

    packages.x86_64-linux.default = self.packages.x86_64-linux.hello;

  };
}
