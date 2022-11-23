{
  description = "Built system for website";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/release-22.05";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs = { self, flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit self; } {
      imports = [];
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      perSystem = { config, self', inputs', pkgs, system, ... }: {
        packages = rec {
          default = site;
          site = pkgs.stdenv.mkDerivation {
            buildInputs = with pkgs; [ nodePackages.typescript ];
            src = ./site;
            name = "kenmerkende-aspecten";
            buildPhase = ''
              cd ts
              tsc --build               
              cd ..
            '';

            installPhase = ''
              mkdir $out
              mkdir $out/ts
              cp ./index.html $out
              cp -r ./css $out/css
              cp -r ./content $out
              cp ./ts/index.js $out/ts
            '';
          };
        };      
      };
      flake = {
       
      };
    };
}
