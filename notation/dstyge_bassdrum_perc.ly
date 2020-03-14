\version "2.18.2"
\paper{
  paper-width = 500
}
  
       
\score {
  <<
  \new RhythmicStaff  \with {
  } 
  {
    \time 4/4
    \clef treble
      c,8. c,16 r8. c,16 c,4 r4 
  }
  
  >>

  \layout{ 
    indent = 0
    line-width = 400
  }
  
  \midi{}

}
