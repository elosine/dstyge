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
      d'''8. d'''16 r8 e'''      d'''8. d'''16 r8 e'''    d'''8. d'''16 r8 e'''     r16 d''' r d'''    d'''8 e'''8
  }
  
  >>

  \layout{ 
    indent = 0
    line-width = 50
  }
  
  \midi{}

}
