$(function () {
  let questions = [
    "I've worked in design for:",
    "I work in:",
    "Industries I work with:",
    "My skills include:",
    "I am currently learning:",
    "I am currently a/an:",
    "I work in:__1",
    "I work in:__2",
    "I work in:__3",
    "I'm not currently working because:",
    "I'm a/an:",
    "My job is challenging because:",
    "My job is great because:",
    "My organization has:",
    "My department has:",
    "I've worked here for:",
    "I've had my role for:",
    "I typically work:",
    "I make:",
    "My benefits include:",
    "I have:",
    "I am:",
    "I am:__1",
    "I feel:",
    "On the side I:",
    "I learned design from:",
    "I got my degree in:",
    "I've had:",
    "I stay current with design by:",
    "I'm currently:",
    "My ZIP code is:",
    "My age is:",
    "I identify as:",
    "LGBTQIA+ status:",
    "I am:__2",
    "I feel the most critical issues/challenges currently facing design are:",
    "I feel the most critical issues/challenges currently facing design are:__",
    "I think the emerging/future technologies that will have the biggest impact on design are:",
    "I think the most critical design skills for the future will be:",
    "My main priorities are:",
  ];

  let chosenCareer = sessionStorage.getItem("career");
  console.log(chosenCareer);

  $.getJSON("data.json", (data) => {
    let selectedDesigner = 0;
    let designersInCareer = [];
    let designerEmploymentType = [];
    let designerHoursWorked = [];

    //CAREER
    for (let designer in data) {
      if (data[designer][questions[1]].includes(chosenCareer)) {
        // selectedDesigner++;
        designersInCareer.push(data[designer]);
      }
    }

    //ORG SIZE
    let employmentType =
      designersInCareer[getRandomInt(designersInCareer.length)][questions[5]];

    for (let designer in designersInCareer) {
      if (designersInCareer[designer][questions[5]] === employmentType) {
        designerEmploymentType.push(designersInCareer[designer]);
      }
    }

    //PROFIT or NONPROFIT
    let hoursWorked =
      designerEmploymentType[[getRandomInt(designerEmploymentType.length)]][
        questions[17]
      ];
    if (hoursWorked.includes("|")) {
      hoursWorked = hoursWorked.substr(0, hoursWorked.indexOf("|"));
    }

    for (let designer in designerEmploymentType) {
      if (
        designerEmploymentType[designer][questions[17]].includes(hoursWorked)
      ) {
        designerHoursWorked.push(designerEmploymentType[designer]);
      }
    }

    //generate in card UI
    $(".employmentType .data").text(hoursWorked);
    $(".hoursWorked .data").text(employmentType);

    // let salaries;
    // for (designer in designerHoursWorked) {
    // }

    //https://www.codegrepper.com/code-examples/javascript/how+to+count+duplicate+values+in+dictionary+javascript
    var salaries = {};
    designerHoursWorked.forEach(function (i) {
      salaries[i[questions[18]]] = (salaries[i[questions[18]]] || 0) + 1;
    });

    let highestSalaryNum = 0;
    let dominantSalary = "";
    let dominantSalaryPercent;
    console.log(salaries);
    for (salary in salaries) {
      if (highestSalaryNum === 0) {
        highestSalaryNum = salaries[salary];
      } else {
        if (salaries[salary] > highestSalaryNum) {
          highestSalaryNum = salaries[salary];
        }
      }
    }
    dominantSalary = Object.keys(salaries).find(
      (key) => salaries[key] === highestSalaryNum
    );
    console.log(highestSalaryNum, designerHoursWorked.length);
    dominantSalaryPercent = Math.round(
      (highestSalaryNum / designerHoursWorked.length) * 100
    );
    console.log(dominantSalaryPercent);
    $("#salaryPercent").text(`${dominantSalaryPercent}%`);
    $("#generatedSalary").text(`${dominantSalary.toLowerCase()}%`);
  });

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint,
    Composites = Matter.Composites,
    Vertices = Matter.Vertices,
    Composite = Matter.Composite,
    Common = Matter.Common,
    Svg = Matter.Svg;

  let engine = Engine.create();

  browserW = window.innerWidth;
  browserH = window.innerHeight;
  let render = Render.create({
    element: document.body,
    engine: engine,

    options: {
      width: browserW,
      height: browserH,
      wireframes: false,
      background: "transparent",
      wireframeBackground: "transparent",
    },
  });

  //boundaries
  let thickness = 200;
  let ground = Bodies.rectangle(
    browserW / 2,
    browserH + thickness / 2 + 2,
    browserW,
    thickness,
    {
      isStatic: true,
      render: {
        lineWidth: 2,
      },
    }
  );
  let ceiling = Bodies.rectangle(
    browserW / 2,
    -thickness / 2 - 2,
    browserW,
    thickness,
    {
      isStatic: true,
      render: {
        lineWidth: 2,
      },
    }
  );
  let leftWall = Bodies.rectangle(
    -thickness / 2 - 2,
    browserH / 2,
    thickness,
    browserH * 2,
    {
      isStatic: true,
      render: {
        lineWidth: 2,
      },
    }
  );
  let rightWall = Bodies.rectangle(
    browserW + thickness / 2 + 2,
    browserH / 2,
    thickness,
    browserH * 2,
    {
      isStatic: true,
      render: {
        lineWidth: 2,
      },
    }
  );

  let industries = {
    "Graphic Designer": {
      name: "Graphic Designer",
      file: "graphic.png",
      svg: "graphic-vector.svg",
      color: "#6F39DF",
      text: "graphic-text.png",
      textSvg: "graphic-text-vector.svg",
    },
    "UX/UI Designer": {
      name: "UX/UI Designer",
      file: "uxui.png",
      svg: "uxui-vector.svg",
      // file: "UXUI.png",
      color: "#5E96FF",
      text: "uxui-text.png",
      textSvg: "uxui-text-vector.svg",
    },
    Illustrator: {
      name: "Illustrator",
      file: "illustrator.png",
      svg: "illustrator-vector.svg",
      color: "#F2AE49",
      text: "illustrator-text.png",
      textSvg: "illustrator-text-vector.svg",
    },
    "Game Designer": {
      name: "Game Designer",
      file: "game.png",
      svg: "game-vector.svg",
      // file: "gameDesigner.png",
      color: "#4ED07A",
      text: "game-text.png",
      textSvg: "game-text-vector.svg",
    },
    "AI Designer": {
      name: "AI Designer",
      file: "ai.png",
      svg: "ai-vector.svg",
      color: "#E25757",
      text: "ai-text.png",
      textSvg: "ai-text-vector.svg",
    },
    "Packaging Designer": {
      name: "Packaging Designer",
      file: "packaging.png",
      svg: "packaging-vector.svg",
      color: "#A9926F",
      text: "packaging-text.png",
      textSvg: "packaging-text-vector.svg",
    },
    "AR/VR Designer": {
      name: "AR/VR Designer",
      file: "arvr.png",
      svg: "arvr-vector.svg",
      color: "#39D8D8",
      text: "arvr-text.png",
      textSvg: "arvr-text-vector.svg",
    },
  };

  if (typeof fetch !== "undefined") {
    var select = function (root, selector) {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    };

    var loadSvg = function (url) {
      return fetch(url)
        .then(function (response) {
          return response.text();
        })
        .then(function (raw) {
          return new window.DOMParser().parseFromString(raw, "image/svg+xml");
        });
    };

    Object.keys(industries).forEach((key) => {
      loadSvg("./img/" + industries[key].svg).then(function (root) {
        let svgScale = 0.3;
        var vertexSets = select(root, "path").map(function (path) {
          return Vertices.scale(
            Svg.pathToVertices(path, 30),
            svgScale,
            svgScale
          );
        });

        World.add(
          engine.world,
          Bodies.fromVertices(
            Common.random(browserW / 2, browserW),
            Common.random(0, browserH / 2),
            vertexSets,
            {
              career: industries[key].name,
              render: {
                sprite: {
                  texture: `./img/${industries[key].file}`,
                  xScale: svgScale / 2,
                  yScale: svgScale / 2,
                },
              },
            },
            true
          )
        );
      });
      // load text svgs
      loadSvg("./img/" + industries[key].textSvg).then(function (root) {
        let svgScale = 0.27;
        var vertexSets = select(root, "path").map(function (path) {
          return Vertices.scale(
            Svg.pathToVertices(path, 30),
            svgScale,
            svgScale
          );
        });

        World.add(
          engine.world,
          Bodies.fromVertices(
            Common.random(browserW / 4, browserW),
            Common.random(0, browserH / 2),
            vertexSets,
            {
              career: industries[key].name,
              render: {
                sprite: {
                  texture: `./img/${industries[key].text}`,
                  xScale: svgScale / 4,
                  yScale: svgScale / 4,
                },
              },
            },
            true
          )
        );
      });
    });
  }

  let mouse = Mouse.create(render.canvas);
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      render: { visible: false },
      stiffness: 1,
    },
  });

  Matter.Events.on(mouseConstraint, "mousedown", function () {
    let body = mouseConstraint.body;
    if (body !== null) {
    } else {
      return;
    }
  });

  render.mouse = mouse;

  World.add(engine.world, [
    // stack,
    leftWall,
    rightWall,
    ceiling,
    ground,
    mouseConstraint,
  ]);
  Engine.run(engine);
  Render.run(render);

  var explosion = function (engine) {
    var bodies = Composite.allBodies(engine.world);
    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];

      if (!body.isStatic && body.position.y >= 500) {
        var forceMagnitude = 0.02 * body.mass;

        Body.applyForce(body, body.position, {
          x:
            (forceMagnitude + Common.random() * forceMagnitude) *
            Common.choose([1, -1]),
          y: -forceMagnitude + Common.random() * -forceMagnitude,
        });
      }
    }
  };

  //Hover events

  $(".careers a").hover(
    function () {
      let careerTitle = $(this).text();
      let bodies = Composite.allBodies(engine.world);
      $("body").css("background", `${industries[careerTitle].color}`);
      for (body in bodies) {
        if ("career" in bodies[body]) {
          if (bodies[body].career !== careerTitle) {
            bodies[body].render.opacity = 0.3;
          } else {
            // bodies[body].timeScale = 0.2;
            let forceMagnitude = 0.03 * bodies[body].mass;
            Body.applyForce(bodies[body], bodies[body].position, {
              x:
                (forceMagnitude + Common.random() * forceMagnitude) *
                Common.choose([1, -1]),
              y: -forceMagnitude + 1 * -forceMagnitude,
            });
          }
        }
      }
      engine.world.gravity.y = 0.03;
    },
    function () {
      $("body").css("background", `#20232c`);
      var bodies = Composite.allBodies(engine.world);
      for (body in bodies) {
        bodies[body].render.opacity = 1;
      }
      engine.world.gravity.y = 1;
      engine.timing.timeScale = 1;
    }
  );

  hideLoading();
});

const hideLoading = () => {
  setTimeout(() => {
    $(".loadingScreen").addClass("hideLoading");
  }, 500);
  setTimeout(() => {
    $(".loadingScreen").remove();
  }, 3000);
};
