# Jeffreymaomao's Project
> web-02-Jeffreymaomao created by GitHub Classroom

- `./project`: slicing
- `./.gitignore`: in order to ignore the `.DS_store` file while git

## Structure of my project：

**project**
> index.html
> **pages**
> > Note.html
> > Code.html
> > Others.html
> > **Note**
> > > *subject_1*
> > > *subject_2*
> > > :
> > > *subject_n*
> >
> > **Code**
> > > *subject_1*
> > > *subject_2*
> > > :
> > > *subject_n*
> >
> > **Others**
> > > *subject_1*
> > > *subject_2*
> > > :
> > > *subject_n*
> >
>
> **js**
> > sidebar.css
> 
> **css**
> > global.css
> > sidebar.css
> > main.css
> > pages.css
>
> **img**
> defalut.png
> > **Note**
> > **Code**
> > **Others**
> 
> **mindmap**


## Structure Management
The mainly sctucture is

> home 
> > page 
> > > subpage 
> > > > subsubpage
> > > >  > subsubsubpage

which is classified by my idea. However, this method may make it hard to manage, I choosing to classified this sctucture in different way. When reprensent the web page

> home ( **html** )
> > page ( **html** ) 
> > > subpage ( **h1 tag** )
> > > > subsubpage ( **h1 tag** )
> > > >  > subsubsubpage ( **html** )

when management the data

> home ( **foler** )
> > page ( **foler** ) 
> > > subpage ( **none** )
> > > > subsubpage ( **none** )
> > > >  > subsubsubpage ( **foler** )

## Full Structure in pages
```
|---- Note
|   |---  high school
|      |--  Class
|        |-  Mathematic
|        |-  Physics
|      |--  Science Fair
|        |-  Calculation
|        |-  show
|        |-  Photo
|      |--  Demos
|        |-  Mathematic
|        |-  Physics
|        |-  Computer Vision
|   |---  college / freshman
|      |--  1st Semester
|        |-  General Physics
|        |-  General Chemistry (I)
|        |-  General Physics Experiment (I)
|        |-  General Chemistry Experiment (I)
|        |-  Introduction to Computers
|        |-  Calculus (I)
|      |--  2nd Semester
|        |-  Engineering Mathematics
|        |-  Vector Calculus
|        |-  General Physics Experiment (II)
|        |-  Transfer Exam
|        |-  Calculus (II)
|   |---  college / sophomore
|      |--  1st Semester
|        |-  Applying Mathematics (I)
|        |-  Modern Physics
|        |-  Electromagnetism
|        |-  Linear Algebra
|        |-  Numerical Analysis
|        |-  Probability Theory
|      |--  2nd Semester
|        |-  Applying Mathematics (II)
|        |-  Quantum Physics (I)
|        |-  Classical Dynamics
|        |-  Image Processing
|        |-  Fundamental Mathematical Physics
|        |-  Numerical Ordinary Differential Equation
|        |-  Critical Thinking
|        |-  Statistics
|   |---  college / junior
|      |--  1st Semester
|        |-  Theory Physics
|        |-  Thermal and Statistical Physics
|        |-  Electromagnetic Ｗaves
|        |-  Introduction of Game Design
|        |-  Fundamental Physics Experiments (I)
|        |-  Fundamental Physics Experiments (III)
|        |-  General Physics TA
|        |-  Numerical Analysis TA
|        |-  Climate Change
|      |--  2nd Semester
|        |-  Computational physics
|        |-  Advanced Optical experiment
|        |-  Fundamental Physics Experiments (III)
|        |-  General Chemistry (II)
|        |-  Information Creativity
|   |---  Others
|      |--  Mathematics
|        |-  General Relativity
|        |-  Bezier Cureve
|        |-  Runge Kutta
|---- Code
|   |---  Programing Language
|      |--  Project
|        |-  Runge Kutta
|        |-  Bezier Curve
|      |--  Python
|        |-  tkinter
|        |-  matplotlib
|        |-  numpy
|        |-  scipy
|        |-  vpython
|      |--  Javascript
|        |-  Desmos
|        |-  Running game
|        |-  Others
|      |--  Processing
|        |-  RGB block
|        |-  Attractor
|        |-  Mouse Interact
|      |--  Desmos
|        |-  Mathematic
|        |-  Physics
|        |-  Computer Vision
|      |--  C
|        |-  pratice
|        |-  numerical calculation
|   |---  Markup language
|      |--  Markdown
|        |-  Physics
|        |-  Mathematics
|        |-  Others
|      |--  LaTeX
|        |-  Useful Formula
|        |-  Physics
|        |-  Mathematics
|        |-  Others
|      |--  web
|        |-  pratice
|        |-  others
|---- Others
|   |---  Art
|      |--  blender
|        |-  Fractal
|        |-  Animation
|      |--  handwriting
|        |-  English
|        |-  Chinese
|   |---  Skate
|      |--  clip
|        |-  Flat
|        |-  Street
|        |-  Freestyle
|      |--  video
|        |-  2023
|        |-  2022
|        |-  2021
|        |-  2020
|        |-  2019
|        |-  2018
```