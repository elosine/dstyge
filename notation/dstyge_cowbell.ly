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
      r4 r8 d''8 g'8. g'16 r4    r8 d'' g' d''16 g' r2
  }
  
  >>

  \layout{ 
    indent = 0
    line-width = 400
  }
  
  \midi{}

}
