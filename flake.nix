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
              mkdir $out/content
              mkdir $out/css
              ls $out/css
              cp ./index.html $out
              cp ./css/main.css $out/css
              cp ./content/kenmerkendeAspecten.json $out/content
              cp ./ts/index.js $out/ts
            '';
          };
        };      
      };
      flake = {
       
      };
    };
}
