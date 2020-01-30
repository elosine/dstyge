\version "2.18.2"
\paper{
  paper-width = 500
}
  
       
\score {
  <<
  \new Staff \with {
    \omit score.TimeSignature 
  } 
  {
    \time 4/4
    \clef treble
    \tempo 4 = 123
      c,8.\ffff c,16 d,8. c,16 c,4 d,4 
  }
  
  >>

  \layout{ 
    indent = 0
    line-width = 400
  }
  
  \midi{}

}
