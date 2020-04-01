use_osc "127.0.0.1", 4000

live_loop :drum_1 do
  tick
  p = rrand(-1, 1) #pan: position of sound in stereo
  with_fx :pan, pan: p do
    osc "/drum1/pan", p
    sample :bd_klub, rate: rrand(1, 3)
    s = [0.5, 0.25, 0.25, 0.5].choose #sleep: time to pause
    sleep s
    osc "/drum1/sleep", s
    sleep s
  end
end

##| live_loop :drum_2 do
##|   tick
##|   c = (line 50, 100, steps: 10).reflect.look #cutoff: frequency cutoff number (int) randomly picked from 60-100 (must be less than 131)
##|   sample :bd_haus,
##|     cutoff: c,
##|     amp: (line 0.25, 1, steps: 5).reflect.look
##|   osc "/drum2/cutoff", c*0.01
##|   sleep 0.5
##| end

##| live_loop :cymbal do
##|   tick
##|   3.times do
##|     r = rrand_i(3, 6) #rate: adjust rate to change pitch
##|     s = (ring 5, 8, 12).tick #sustain: amount of time for sound to remain at sustain level amplitude
##|     c = (line 70, 60, steps: 5).reflect.look #cutoff
##|     sample :drum_cymbal_hard,
##|       rate: r,
##|       sustain: s,
##|       cutoff: c
##|     osc "/cymbal", r*0.01, s*0.01
##|     sleep 0.125
##|   end
##| end

##| with_fx :bitcrusher do
##|   live_loop :beat_slicer do
##|     slice_idx = rand_i(8)
##|     slice_size = 0.125
##|     s = slice_idx * slice_size
##|     f = s + slice_size
##|     c = rrand_i(60, 100) #cutoff
##|     osc "/safari/cutoff", c*0.01
##|     sample :loop_safari, start: s, finish: f, cutoff: c, amp: 1.5
##|     sleep 2
##|   end
##| end




