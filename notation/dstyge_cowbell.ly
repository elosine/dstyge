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
    \clef treble
      r4 r8 d''8 g'8. g'16 r4    r8 d'' g' d''16 g' r2
  }
  
  >>

  \layout{ 
    indent = 0
    line-width = 50
  }
  
  \midi{}

}
