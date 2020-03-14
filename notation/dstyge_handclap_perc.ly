\version "2.18.2"
\paper{
  paper-width = 500
}
  
       
\score {
  <<
  \new RhythmicStaff \with {
  } 
  {
    \time 4/4
    \clef bass
      r4 g, r g,  
  }
  
  >>

  \layout{ 
    indent = 0
    line-width = 400
  }
  
  \midi{}

}
