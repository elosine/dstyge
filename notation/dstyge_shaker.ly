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
    \clef bass
    \tempo 4 = 123
      c''16 b'  c''16 b'  c''16 b'  c''16 b'  c''16 b'  c''16 b'  c''16 b'  c''16 b'  
  }
  
  >>

  \layout{ 
    indent = 0
    line-width = 400
  }
  
  \midi{}

}
