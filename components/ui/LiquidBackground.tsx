"use client";

import { useEffect } from "react";
import "@/app/globals.css"; 

export default function LiquidBackground() {
  
  useEffect(() => {
    const loadShader = async () => {
      const { ShaderArt } = await import("shader-art");
      const { UniformPlugin } = await import("@shader-art/plugin-uniform");

      if (!customElements.get("shader-art")) {
        ShaderArt.register([() => new UniformPlugin()]);
      }
    };

    loadShader();
  }, []);

  const shaderHTML = `
    <uniform type="float" name="scale" value="0.4" />
    <uniform type="float" name="ax" value="5" />
    <uniform type="float" name="ay" value="7" />
    <uniform type="float" name="az" value="9" />
    <uniform type="float" name="aw" value="13" />
    <uniform type="float" name="bx" value="1" />
    <uniform type="float" name="by" value="1" />
    
    <uniform type="color" name="color1" value="#000000" />
    <uniform type="color" name="color2" value="#022c22" />
    <uniform type="color" name="color3" value="#10b981" />
    <uniform type="color" name="color4" value="#a7f3d0" />
    
    <script type="buffer" name="position" data-size="2">
      [-1, 1, -1,-1, 1,1, 1, 1, -1,-1, 1,-1]
    </script>
    <script type="buffer" name="uv" data-size="2">
      [ 0, 0,  0, 1, 1,0, 1, 0,  0, 1, 1, 1]
    </script>
    
    <script type="vert">
      precision highp float;
      attribute vec4 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = position;
      }
    </script>
    
    <script type="frag">
      precision highp float;
      varying vec2 vUv;
      uniform float time;
      uniform float scale;
      uniform vec2 resolution;
      uniform vec3 color1, color2, color3, color4;
      uniform float ax, ay, az, aw;
      uniform float bx, by;
      
      float cheapNoise(vec3 stp) {
        vec3 p = vec3(stp.st, stp.p);
        vec4 a = vec4(ax, ay, az, aw);
        return mix(
          sin(p.z + p.x * a.x + cos(p.x * a.x - p.z)) * cos(p.z + p.y * a.y + cos(p.y * a.x + p.z)),
          sin(1. + p.x * a.z + p.z + cos(p.y * a.w - p.z)) * cos(1. + p.y * a.w + p.z + cos(p.x * a.x + p.z)), 
          .436
        );
      }
      
      void main() {
        vec2 aR = vec2(resolution.x/resolution.y, 1.);
        vec2 st = vUv * aR * scale;
        float S = sin(time * .005);
        float C = cos(time * .005);
        vec2 v1 = vec2(cheapNoise(vec3(st, 2.)), cheapNoise(vec3(st, 1.)));
        vec2 v2 = vec2(
          cheapNoise(vec3(st + bx*v1 + vec2(C * 1.7, S * 9.2), 0.15 * time)),
          cheapNoise(vec3(st + by*v1 + vec2(S * 8.3, C * 2.8), 0.126 * time))
        );
        float n = .5 + .5 * cheapNoise(vec3(st + v2, 0.));
        vec3 color = mix(color1, color2, clamp((n*n)*8.,0.0,1.0));
        color = mix(color, color3, clamp(length(v1),0.0,1.0));
        color = mix(color, color4, clamp(length(v2.x),0.0,1.0));
        color /= n*n + n * 7.;
        gl_FragColor = vec4(color,1.);
      }
    </script>
  `;

return (
    <div 
      className="absolute top-0 left-0 w-full -z-10 bg-black pointer-events-none"
      style={{
        height: '90vh', 
        // Signifie : Visible à 100% jusqu'à 70%, puis devient transparent jusqu'à 100%
        maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' // Pour Safari/Chrome
      }}
    >
      <style>{`
        shader-art {
          display: block;
          width: 100%;
          height: 100%;
          opacity: 0.7;
        }
        shader-art canvas {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>

      <shader-art
        autoplay
        dangerouslySetInnerHTML={{ __html: shaderHTML }}
      />
    </div>
  );
}