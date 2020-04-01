/*{ "osc": 4000 }*/

precision mediump float;
uniform float time;
uniform vec2 resolution;
// osc messages
uniform sampler2D osc_safari_cutoff;
uniform sampler2D osc_drum1_sleep;
uniform sampler2D osc_drum1_pan;
uniform sampler2D osc_drum2_cutoff;
uniform sampler2D osc_cymbal;

float rand(vec2 co) {
    return fract(sin(dot(co.xy , vec2(12.9898, 78.233))) * 43758.5453);
}

float circle(vec2 frag_coord, float radius) {
    return length(frag_coord) - radius;
}

float cleanCircle(float st, float shape){
  return step(st, shape);
}

vec2 rotate(vec2 p, float angle) {
    float sine = sin(angle);
    float cosine = cos(angle);
    return vec2(
        cosine * p.x + sine * p.y,
        cosine * p.y - sine * p.x
    );
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    // receiving osc messages
    float drum1_pan = texture2D(osc_drum1_pan, uv).x;
    float drum1_sleep = texture2D(osc_drum1_sleep, uv).x;
    float safari_cutoff = texture2D(osc_safari_cutoff, uv).x;
    float drum2_cutoff = texture2D(osc_drum2_cutoff, uv).x;
    vec2 cymbal = vec2(texture2D(osc_cymbal, uv).x, texture2D(osc_cymbal, uv).y);

    //live loop - drum1: pan, sleep
    vec2 circleCoord = uv + vec2(drum1_pan, -drum1_pan);
    float mainCircle = circle(circleCoord, drum1_sleep);
    gl_FragColor =vec4(vec3(mainCircle), 1.0);

    // //live loop - drum2: cutoff; cymbal: rate, sustain
    // vec3 color = vec3(1.0, 1.0, 1.0) * step(mainCircle, 0.0);
    // //live loop - safari sample:
    // color.r = min(mod(mainCircle, safari_cutoff) * 10.0, mod(mainCircle, safari_cutoff) * 10.0);
    // color.b = 1.0-min(mod(mainCircle, drum1_sleep) * 10.0, mod(mainCircle, drum1_sleep) * 10.0);
    // vec3 bgColor = mix(vec3(0.568, 0.631, 0.952), vec3(drum2_cutoff), rand(uv*cymbal));
    // vec3 scene = bgColor;
    // scene = mix(scene, color, mainCircle);
    // gl_FragColor =vec4(vec3(scene), 1.0);

    //----------------
    /*
    //two circles
    vec2 leftCoord = uv + vec2(drum1_pan, -drum1_pan);
    vec2 rightCoord = uv + vec2(-drum1_pan, drum1_pan);
    float leftCircle = circle(leftCoord, drum1_sleep);
    float rightCircle = circle(rightCoord, drum1_sleep);
    float combined_shapes = min(leftCircle, rightCircle);
    vec3 color = vec3(1.0, 1.0, 1.0) * step(combined_shapes, 0.0);
    vec3 bgColor = mix(vec3(0.568, 0.631, 0.952), vec3(drum2_cutoff), rand(uv*cymbal));
    vec3 scene = bgColor;
    color.r = min(mod(leftCircle, safari_cutoff) * 10.0, mod(rightCircle, safari_cutoff) * 10.0);
    color.b = 1.0-min(mod(leftCircle, drum1_sleep) * 10.0, mod(rightCircle, drum1_sleep) * 10.0);

    scene = mix(scene, color, combined_shapes);
    gl_FragColor =vec4(vec3(scene), 1.0);
    */
}
